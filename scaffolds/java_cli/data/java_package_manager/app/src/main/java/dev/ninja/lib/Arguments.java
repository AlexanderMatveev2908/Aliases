package dev.ninja.lib;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Arguments {
  private String group;
  private String artifact;
  private String version;
  private String scope;
}
