function is_empty(col) {
  return !col || col.length === 0;
}

function get_transformed_cols(table_model) {
  if (is_empty(table_model)) return '*';
  return table_model.map(col => {
    if (col.transformation) return `${col.transformation} as ${col.name}`;
    return col.name;
  }).join(',\n');
}

function get_stage_table(load_id, table_name, table_model) {
  let cols = get_transformed_cols(table_model);
  return `
    select
      '${load_id}' as load_id,
      current_timestamp() as load_time,
      'unknown' as file_name,  -- Hardcoded dummy value to avoid source column dependency
      ${cols}
    from ${table_name}
  `;
}