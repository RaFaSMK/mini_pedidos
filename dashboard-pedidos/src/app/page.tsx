'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import Logo from '@/../public/logo.png'; // Assumindo que seu logo está aqui
import Mascote from "@/../public/mascote.png"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // Suas funções de handleLogin e handleRegister estão ótimas
  const handleLogin = () => {
    localStorage.setItem('auth_token', 'fake-token-123');
    router.push('/dashboard');
  };

  const handleRegister = () => {
    localStorage.setItem('auth_token', 'fake-token-123');
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">      {/* Fundo dividido para Desktop (lg)
        Fundo verde sólido para Mobile (default)
      */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 z-0">
        <div className="bg-emerald-900"></div>
        <div className="hidden lg:block"></div>
      </div>

      {/* Logo no canto */}
      <div className="absolute top-8 left-8 z-20">
        <Image src={Logo} alt="Logo Oticket" width={100} height={40} />
      </div>

      {/* Ilustrações Decorativas (substitua pelos seus assets) */}
      {/* Ilustração da Scooter (Aparece no desktop, à esquerda) */}
      <div className="absolute z-10 hidden lg:block -left-20 bottom-1/3">
        {/*  */}
        {/* Ex: <Image src="/scooter-guy.png" alt="Homem na scooter" width={300} height={300} /> */}
        <div>
        <Image src={Mascote} alt='Mascote' height={600} width={600} />
        </div>
      </div>

      {/* Ilustração Flutuando (Aparece no desktop, à direita) */}
      <div className="absolute z-10 hidden lg:block right-20 top-1/4">
        {/*  */}
        {/* Ex: <Image src="/floating-girl.png" alt="Mulher flutuando" width={300} height={300} /> */}
        <div>
        <Image src={Mascote} alt='Mascote' height={600} width={600}/>
        </div>
      </div>

      {/* Card Central do Formulário */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-xl mx-4 sm:mx-0"> {/* Adjusted classes */}
        {isLogin ? (
          <LoginForm
            onToggle={() => setIsLogin(false)}
            onLogin={handleLogin}
          />
        ) : (
          <RegisterForm
            onToggle={() => setIsLogin(true)}
            onRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
}