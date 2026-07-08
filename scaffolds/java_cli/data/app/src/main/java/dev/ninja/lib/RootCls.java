package dev.ninja.lib;

import java.lang.reflect.Field;

public interface RootCls {
  default String toPrettyString() {
    StringBuilder sb = new StringBuilder();
    Class<?> cls = getClass();

    sb.append(cls.getSimpleName()).append(" {\n");

    while (cls != null && cls != Object.class) {
      for (Field field : cls.getDeclaredFields()) {
        field.setAccessible(true);

        try {
          sb.append("  ")
              .append(field.getName())
              .append(": ")
              .append(field.get(this))
              .append("\n");
        } catch (IllegalAccessException err) {
          sb.append("  ")
              .append(field.getName())
              .append(": <inaccessible>\n");
        }
      }

      cls = cls.getSuperclass();
    }

    sb.append("}");

    return sb.toString();
  }
}
