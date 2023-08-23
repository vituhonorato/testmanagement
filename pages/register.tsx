import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';

interface LoginFormValues {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(4, 'O nome de usuário precisa ter no mínimo 4 caracteres')
    .required('O nome de usuário é obrigtatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .required('A senha é obrigadoria'),
  confirmpassword: Yup.string()
    .min(6, 'A confirmação de senha precisa ter no mínimo 4 caracteres')
    .required('A confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senha precisam combinar'),
});

const initialValues: LoginFormValues = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
};

const RegisterScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect }: any = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const handleSubmit = async ({ name, email, password }: LoginFormValues) => {
    // Submit login data to the server

    try {
      await axios.post('/api/auth/signup', { name, email, password });

      const result: any = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Registrar">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-3xl font-semibold">Criar nova conta</h1>
          <div className="bg-white p-3 rounded-md bg-opacity-80">
            <div className="mb-4">
              <label htmlFor="email" className="text-lg font-semibold">
                Nome de usuário
              </label>
              <Field
                autoFocus
                className="w-full"
                type="name"
                id="name"
                name="name"
              />
              <div className="text-red">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <Field
                autoFocus
                className="w-full"
                type="email"
                id="email"
                name="email"
              />
              <div className="text-red">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-lg font-semibold">
                Senha
              </label>
              <Field
                autoFocus
                className="w-full"
                type="password"
                id="password"
                name="password"
              />
              <div className="text-red">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-lg font-semibold">
                Confirmar senha
              </label>
              <Field
                autoFocus
                className="w-full"
                type="password"
                id="confirmpassword"
                name="confirmpassword"
              />
              <div className="text-red">
                <ErrorMessage name="confirmpassword" />
              </div>
            </div>
            <div className="mb-4">
              <button type="submit" className="primary-button">
                Registrar
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </Layout>
  );
};
export default RegisterScreen;
