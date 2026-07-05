
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