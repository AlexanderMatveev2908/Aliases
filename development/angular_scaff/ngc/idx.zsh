ngc() {
  local arg_path="$1"
  local prefix="${2:-}"
  local suffix="${3:-}"

  if [[ -z "$arg_path" ]]; then
    echo "❌ Path required!"
    return 1
  fi

  local abs_path="$(realpath "$arg_path")"
  local component_name="$(basename "$abs_path")"


  if [[ "$prefix" == "p" ]]; then
    local parent_dir="$(basename "$(dirname "$abs_path")")"
    component_name="${component_name}_${parent_dir}"
  elif [[ -n "$prefix" ]]; then
    component_name="${prefix}_${component_name}"
  fi

  if [[ -n "$suffix" ]]; then
    component_name="${component_name}_${suffix}"
  fi

  local class_name="$(pascal_case "$component_name")"
  local file_name="$(kebab_case "$component_name")"
  local selector="app-${file_name}"

  (
    cd "$abs_path" || { echo "❌ dir $dir_to_use not found"; return 1; }

    cat > "${file_name}.scss" << EOF
.root{}
EOF
    
    cat > "${file_name}.ts" << EOF
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '$selector',
  imports: [],
  templateUrl: './${file_name}.html',
  styleUrl: './${file_name}.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class $class_name {}
EOF

    cat > "${file_name}.html" << EOF
<div class="root">
  <p>$class_name generated 🎉</p>
</div>
EOF

    echo "🛠️ generated $class_name"
  )
}
