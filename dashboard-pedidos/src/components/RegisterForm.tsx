import { InputLogin } from './InputLogin';

interface RegisterFormProps {
  onToggle: () => void;
  onRegister: () => void;
}

export const RegisterForm = ({ onToggle, onRegister }: RegisterFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-white rounded-3xl p-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Bem-vindo ao <span className="font-semibold">Oticket</span></p>
            <h1 className="text-4xl font-bold text-gray-900">Cadastrar</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Possui conta?</p>
            <button type="button" onClick={onToggle} className="text-sm text-green-600 font-medium hover:text-green-900">
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <InputLogin
          label="Coloque seu usuário ou endereço de email"
          placeholder="Usuário ou endereço de email"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputLogin
            label="Nome de usuário"
            placeholder="Nome de usuário"
          />
          <InputLogin
            label="Número de contato"
            placeholder="Número de contato"
          />
        </div>

        <InputLogin
          label="Coloque sua senha"
          type="password"
          placeholder="Senha"
        />

        <button type="submit" className="w-full bg-green-600 hover:bg-green-900 text-white font-semibold py-3 rounded-lg transition-colors">
          Cadastrar
        </button>
      </div>
    </form>
  );
};
