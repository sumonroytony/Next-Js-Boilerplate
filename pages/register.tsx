import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { User } from 'shared/types/User';

const userSchema = z
  .object({
    firstName: z.string().nonempty('First Name is required!'),
    lastName: z.string().nonempty('Last Name is required!'),
    email: z.string().email().nonempty('Email is required!'),
    password: z
      .string()
      .min(8, { message: 'Password must be 8 character or long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = (data: User) => console.log(data);
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
      <div className="bg-white px-6 py-3 shadow-lg text-left md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div className="text-center font-bold m-2 p-2 text-3xl">Register</div>
        <form
          id="awesome-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <label className="block" htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            id="firstName"
            type="text"
            {...register('firstName')}
          />
          <p className="text-red-500 ">{errors.firstName?.message}</p>
          <label className="block" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            id="lastName"
            type="text"
            {...register('lastName')}
          />
          <p className="text-red-500 ">{errors.lastName?.message}</p>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            id="email"
            type="email"
            {...register('email')}
          />
          <p className="text-red-500 ">{errors.email?.message}</p>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            id="password"
            type="password"
            {...register('password')}
          />
          <p className="text-red-500 ">{errors.password?.message}</p>
          <label className="block" htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <p className="text-red-500 ">{errors.confirmPassword?.message}</p>
        </form>
        <footer className="flex justify-end">
          <button
            form="awesome-form"
            className="block btn-primary mt-4"
            type="submit"
          >
            Register{' '}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Register;
