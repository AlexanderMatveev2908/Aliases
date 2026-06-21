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

ngf(){
  local arg_path="$1"
  local prefix="${2:-}"
  local suffix="${3:-}"

  if [[ -z "$arg_path" ]]; then
    echo "❌ Path required!"
    return 1
  fi

  local abs_path="$(realpath "$arg_path")"
  local feature_name="$(basename "$abs_path")"

  if [[ "$prefix" == "p" ]]; then
    local parent_dir="$(basename "$(dirname "$abs_path")")"
    feature_name="${parent_dir}_${feature_name}"
  elif [[ -n "$prefix" ]]; then
    component_name="${prefix}_${component_name}"
  fi

  if [[ -n "$suffix" ]]; then
    feature_name="${feature_name}_${suffix}"
  fi

  local filename=$(kebab_case "$feature_name")
  local camelName=$(camel_case "$feature_name")
  local pascalName=$(pascal_case "$feature_name")

  local reducer_dir="$abs_path/reducer"
  mkdir -p "$reducer_dir"

  touch \
    "$reducer_dir/selector.ts" \
    "$reducer_dir/actions.ts" \
    "$reducer_dir/index.ts" \
    "$abs_path/slice.ts"
  
  cat > "$reducer_dir/index.ts" <<EOF
import { createReducer, on } from '@ngrx/store';


export interface ${pascalName}StateT {
}

const initState: ${pascalName}StateT = {
};

export const ${camelName}Reducer = createReducer(
  initState,
);

EOF

  cat > "$reducer_dir/actions.ts" <<EOF
import { createAction, props } from '@ngrx/store';

export const ${pascalName}ActT = {
};

EOF

  cat > "$reducer_dir/selector.ts" <<EOF
import { createFeatureSelector } from '@ngrx/store';
import { ${pascalName}StateT } from '.';

export const get${pascalName}State = createFeatureSelector<${pascalName}StateT>('${camelName}');

EOF

  cat > "$abs_path/slice.ts" <<EOF
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Injectable, Signal } from '@angular/core';
import { get${pascalName}State } from './reducer/selector';
import { ${pascalName}StateT } from './reducer';

@Injectable({
  providedIn: 'root',
})
export class ${pascalName}Slice extends UseKitSliceSvc {
  public get get${pascalName}State(): Signal<${pascalName}StateT> {
    return this.store.selectSignal(get${pascalName}State);
  }
} 
EOF

}