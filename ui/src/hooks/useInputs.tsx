import { FormInputs } from "@/types";
import { useState, useCallback } from "react";

const objectTypeNames = ["phone", "email"];

// useInputs 훅이 return하는 type 정의
type UseInputs<T extends FormInputs> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

const useInputs = <T extends FormInputs>(initialForm: T): UseInputs<T> => {
  const [form, setForm] = useState<T>(initialForm);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((form) => ({ ...form, [name]: e.target.checked }));
      return;
    }

    if (type === "radio" && name === "show_times_id") {
      setForm((form) => ({ ...form, [name]: Number(value) }));
      return;
    }

    const typeName = objectTypeNames.find((typeName) => name.includes(typeName));
    // name 예시: phone1, phone2, email1, email2, email3
    if (typeName === "phone" || typeName === "email") {
      const updatedForm = {
        ...form,
        [typeName]: {
          ...(form[typeName] as object),
          [name]: value === "직접 입력" && typeName === "email" ? "" : value,
        },
      };

      setForm(updatedForm);
      return;
    }

    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default useInputs;
