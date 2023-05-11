import React, { useState } from "react";
interface Props {
  button?: string;
  redirect?: string;
  name: string;
  message: string;
  error: string;
  fields: {
    fieldType: string;
    id: string;
    name: string;
  }[];
}
type FormState = "ready" | "pending" | "success" | "error" | "empty";

const ContactForm = ({
  name,
  redirect,
  message,
  error,
  fields,
  button = "Send Message",
}: Props) => {
  function initializeForm(fields: Props["fields"]) {
    const form = {};
    // @ts-ignore
    fields.forEach((field) => (form[field.id] = ""));
    return form;
  }
  const [formData, setData] = useState(initializeForm(fields));
  const [formState, setFormState] = useState<FormState>("ready");

  const sendOptions = {
    to: [{ email: "clayton@simply-sprout.com", name: "Clayton Schneider" }],
    from: {
      email: "noreply@simply-sprout.com",
      Name: "Website Email Bot",
    },
    subject: "Email Form Submission",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fetchBody = JSON.stringify({
      form: {
        name,
        data: formData,
      },
      sendOptions,
    });

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: fetchBody,
    };

    setFormState("pending");

    if (validateFields() === false) {
      return;
    }

    try {
      await fetch(
        "https://send-email.simplysprout.workers.dev/",
        requestOptions
      );
      if (redirect) {
        document.location.href = redirect;
      } else {
        setFormState("success");
      }
    } catch (err) {
      setFormState("error");
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    //@ts-ignore
    formData[id] = value;
    setData(formData);
  };

  const validateFields = () => {
    for (const field in formData) {
      // @ts-ignore
      // Need a way to type the form
      if (formData[field] === "") {
        setFormState("empty");
        return false;
      }
    }
    return true;
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="my-5 mt-10 grid w-full grow grid-cols-1 gap-4 lg:grid-cols-2"
    >
      {fields.map((field, key) => (
        <div
          className={
            (field.fieldType === "textarea"
              ? "col-span-full"
              : "col-span-full lg:col-span-1") + " relative"
          }
          key={`input-${key}`}
        >
          <label htmlFor={field.id} className="">
            {field.name}
          </label>
          {field.fieldType === "textarea" ? (
            <textarea
              onChange={handleChange}
              name={field.name}
              id={field.id}
              className="h-[150px] w-full resize-none rounded border border-black px-4 pt-2 placeholder:text-black focus:outline-none"
              placeholder={field.name}
            />
          ) : (
            <input
              onChange={handleChange}
              type={field.fieldType}
              name={field.name}
              id={field.id}
              className="w-full rounded bg-white py-2 pl-4 border border-black placeholder:text-black focus:outline-none"
              placeholder={field.name}
            />
          )}
        </div>
      ))}

      {(formState === "ready" || formState === "empty") && (
        <button className="col-span-full rounded-3xl border-2 border-transparent bg-primary py-4 px-11 text-center leading-none text-white font-roboto transition-all duration-300 hover:border-primary hover:bg-transparent hover:text-primary">
          {button}
        </button>
      )}
      {formState === "empty" && (
        <p>Please make sure you have filled all form fields.</p>
      )}
      {formState === "pending" && <p>sending...</p>}
      {formState === "success" && <p>{message}</p>}
      {formState === "error" && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ContactForm;
