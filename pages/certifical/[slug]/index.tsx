import Layout from '@/components/Layout';
import Certifical from '@/models/Certifical';
import { BiArrowBack } from 'react-icons/bi';
import db from '@/utils/db';
import Image from 'next/image';
import Link from 'next/link';
import { BsWhatsapp, BsArrowDownLeft } from 'react-icons/bs';
import React from 'react';
import Alert from '@/components/Alert';

const CertificalScreen = (props: any) => {
  const { certifical } = props;

  if (!certifical) {
    return <div>Produto não encontrado</div>;
  }

  function redirecionarWhatsapp() {
    const phone = certifical.contact; // número de telefone
    const message = 'Olá, estou entrando em contato através do seu site.'; // mensagem que será enviada

    // constrói o link com o número de telefone e a mensagem
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // redireciona para o link do WhatsApp
    window.location.href = url;
  }

  return (
    <Layout title="">
      <div className="py-8">
        <Alert message="O condomínio Parque das Árvores não se responsabiliza por nenhuma transação entre condôminos e prestadores de serviço nesta plataforma." />
      </div>
      <div className="  bg-white bg-opacity-80 mt-8 mb-8 rounded-md">
        <Link
          className="text-indigo600 font-semibold flex py-3 px-3"
          href="/certificals"
        >
          <span className="py-1 px-1 ">
            <BiArrowBack />
          </span>
          Voltar
        </Link>

        <div className="flex justify-center py-6">
          <h1 className="text-3xl font-semibold">
            <span className="  rounded-full p-2 ">{certifical.name}</span>
          </h1>
        </div>

        <div className="grid  md:grid-cols-1 md:gap-1">
          <div className="flex flex-col items-center justify-center p-5 md:col-span-1">
            <Image
              src={certifical.image}
              alt={certifical.title}
              width={640}
              height={640}
            />
          </div>
          <div className="px-3 py-3">
            <div className="flex justify-center py-8 ">
              <p className="text-3xl font-semibold   p-2">
                ###{' '}
                <span className="text-3xl font-semibold ">
                  {certifical.date}
                </span>
              </p>
            </div>
            <p className="pt-6 flex  font-semibold">
              Clique no ícone para contato{' '}
              <span className="py-1 px-2">
                <BsArrowDownLeft />
              </span>
            </p>
            <div className="flex ">
              <button
                onClick={redirecionarWhatsapp}
                className=" bg-green-700 p-3 mb-4 rounded text-base font-semibold"
              >
                <BsWhatsapp />
              </button>
              <p className="flex py-1 px-3 text-xl ">{certifical.contact}</p>
            </div>
            <div className="flex justify-center py-8  mb-5">
              <p className="text-xl font-medium">{certifical.description}</p>
            </div>
          </div>
          <div>
            <h1 className="mb-4 text-3xl font-semibold pt-8">{` CL -  ${certifical._id}`}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// backend
export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const certifical = await Certifical.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      certifical: certifical ? db.convertDocToObj(certifical) : null,
    },
  };
}

export default CertificalScreen;
