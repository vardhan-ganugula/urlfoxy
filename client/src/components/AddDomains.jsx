import React, { useEffect } from "react";
import Button from "./Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddDomainMutation } from "../store/apis/domains";
const AddDomains = ({ onNext, setCurrentDomain }) => {
  const [triggerFunction, { isLoading, isSuccess, data }] = useAddDomainMutation();

  const schema = z.object({
    domain: z
      .string()
      .min(3, {
        message: "domain should atleast 3 character long",
      })
      .regex(
        /(([a-z0-9-]+\.)*)([a-z0-9-]+\.[a-z]+)/,
        "Please enter a valid domain name (e.g., example.com)"
      ),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const registerDomain = (data) => {
    triggerFunction(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setCurrentDomain(data?.data?.domain)
      onNext();
    }
  }, [isSuccess, onNext, data, setCurrentDomain]);
  return (
    <section className="w-full bg-zinc-900 rounded-lg border border-zinc-700 flex flex-col mb-5">
      <div className="px-6 py-4 border-b border-zinc-700 flex-shrink-0">
        <h2 className="text-lg font-semibold text-white relative">
          <span className="w-[5px] absolute h-full bg-primary"></span>
          <span className="pl-3">Add Domains</span>
        </h2>
        <p className="text-sm text-zinc-400">add your domain here</p>
      </div>
      <div className="p-5  border-zinc-700 border-b">
        <form
          onSubmit={handleSubmit(registerDomain)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="domain" className="capitalize">
              enter your custom domain
            </label>
            <input
              type="text"
              placeholder="example.com"
              id="domain"
              //   pattern="(([a-z0-9\-]+\.)*)([a-z0-9\-]+\.[a-z]+)"
              className="outline-none p-2 ring-0 border rounded"
              //   title="Please enter a valid domain name (e.g., example.com)"
              {...register("domain")}
            />
            {errors && errors.domain && (
              <p className="text-red-500 text-sm">{errors.domain.message}</p>
            )}
          </div>
          <div>
            <Button
              variant="squared"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
      <div className="px-6 py-4 flex justify-between text-zinc-400 flex-shrink-0">
        <span>move to next step</span>
        <span>
          <Button variant="squared" className='bg-amber-500' onClick={() => onNext()}>
            Next
          </Button>
        </span>
      </div>
    </section>
  );
};

export default React.memo(AddDomains);
