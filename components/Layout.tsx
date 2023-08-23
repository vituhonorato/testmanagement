/* eslint-disable no-mixed-spaces-and-tabs */
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';

import { ImMenu } from 'react-icons/im';
import Image from 'next/image';
import { BsInstagram } from 'react-icons/bs';
import { BsWhatsapp } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import DropdownLink from './DropdownLink';

const Layout = ({ children, title }: any) => {
  const { status, data: session }: any = useSession();
  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - CertificaLink' : 'CertificaLink'}</title>
        <meta name="description" content="home" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-28 justify-between items-center px-4 ">
               {/* <div className=" mt-8  flex items-start justify-center">
                  <Link href="/">
                    <Image
                      className="bg-white rounded-full"
                      src="/images/logo1.png"
                      alt="logo"
                      width={120}
                      height={120}
                    />
                  </Link>
                </div> */}
            <div className="text-3xl py-3 flex items-center ">
              <Link href="/">
                <div className=" mt-8">
                  <Image
                    className="bg-white rounded-full"
                    src="/images/logo1.png"
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
            </div>
            <div>
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600 flex">
                    <p className="px-2 font-bold">Olá</p>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Perfil
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/register">
                        Registrar
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/certificals"
                        >
                          Painel Admin
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <Link
                        className="dropdown-link"
                        href="/#"
                        onClick={logoutClickHandler}
                      >
                        Sair
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <p className="text-lg font-semibold">Login</p>
                </Link>
              )}
            </div>
          </nav>

          <div className="flex h-20 justify-between  items-center px-4 ">
           
            <div className="font-bold  ">
              <ul className="hidden absolute  left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li>
                  <Link className="nav-bar" href="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link className="nav-bar " href="/login?redirect=/certificals">
                    Certificados
                  </Link>
                </li>
              
                <li>
                  <Link className="nav-bar" href="/">
                    Sobre
                  </Link>
                </li>

                <li>
                  <Link className="nav-bar" href="/contact">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            {/* menu md and sm */}
            <div className="">
              <Menu
                as="div"
                className="relative inline-block lg:hidden absolute"
              >
                <Menu.Button className="text-blue-600">
                  <ImMenu />
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/">
                      Home
                    </DropdownLink>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      className="dropdown-link"
                      href="/login?redirect=/certificals"
                    >
                      Certificados
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      className="dropdown-link"
                      href="/login?redirect=/about"
                    >
                      Sobre
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link className="dropdown-link" href="/contact">
                      Contato
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </header>
        <main className="container m-auto mt-4 px-4">
          
          {children}
        
        </main>


        {/* footer */}
        <footer className="flex h-20 justify-between items-center  b">
          <div className="px-4">
            <p className="font-semibold">CertificaLink</p>
          </div>
          <div>
            <p>
              {' '}
              <span>Copyright</span> &copy; 2023{' '}
            </p>
          </div>
          <div className="flex justify-between px-2">
            <Link
              className="flex px-1"
              href="https://www.instagram.com/cparquedasarvores/"
            >
              <BsInstagram className="w-5 h-5" />
            </Link>
            <Link
              className="flex pl-3 pr-2"
              href="https://api.whatsapp.com/send?phone=5571999426443&text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es"
            >
              <BsWhatsapp className="w-5 h-5" />
            </Link>

            <Link className="flex pl-1 pr-2" href="/contact">
              <FiMail className="w-5 h-5" />
            </Link>
            <Link
              className="flex pl-1 pr-3"
              href="https://api.whatsapp.com/send?phone=5571987840407&text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es"
            >
              <BiSupport className="w-5 h-5" />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
