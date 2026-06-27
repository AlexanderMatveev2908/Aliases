export class FormParser {
  public static genFormData<T extends Record<string, unknown>>(data: T): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value == null) continue;

      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }

    return formData;
  }
}
