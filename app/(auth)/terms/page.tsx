

export const metadata = {
  title: "Termos e Privacidade",
  description: "Leia nossos termos e política de privacidade.",
};



export default function TermosEPrivacidade() {
  return (

    <div className="flex flex-col p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-nacelle mb-6 text-center">Termos de Serviço</h1>
      <p className="mb-4 text-justify">
        Ao utilizar nosso serviço, você concorda em cumprir os seguintes termos e condições. Se você não concorda com estes termos, não utilize nossos serviços.
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>É necessário ter pelo menos 18 anos para acessar e utilizar nosso serviço.</li>
        <li>É proibido compartilhar informações pessoais de outros usuários sem consentimento.</li>
        <li>Reservamo-nos o direito de modificar ou encerrar o serviço a qualquer momento, sem aviso prévio.</li>
      </ul>

      <h2 className="text-2xl font-nacelle mb-4">Política de Privacidade</h2>
      <p className="mb-4 text-justify">
        Levamos sua privacidade a sério. Esta política explica como coletamos, utilizamos e protegemos suas informações pessoais.
      </p>

      <h3 className="font-nacelle mb-2">Coleta de Informações</h3>
      <p className="mb-4 text-justify">
        Coletamos informações quando você se registra em nosso serviço, realiza um pedido ou interage conosco. As informações podem incluir:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Nome</li>
        <li>Email</li>
        <li>Informações de pagamento</li>
      </ul>

      <h3 className="font-nacelle mb-2">Uso das Informações</h3>
      <p className="mb-4 text-justify">
        As informações coletadas podem ser utilizadas para:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Melhorar nossos serviços e a experiência do usuário;</li>
        <li>Processar transações de forma eficiente;</li>
        <li>Enviar comunicações e atualizações periódicas.</li>
      </ul>

      <h3 className="font-nacelle mb-2">Segurança das Informações</h3>
      <p className="mb-4 text-justify">
        Implementamos medidas de segurança robustas para proteger suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou de armazenamento eletrônico é 100% seguro.
      </p>

      <h2 className="text-2xl font-nacelle mb-4">Alterações aos Termos</h2>
      <p className="mb-4 text-justify">
        Podemos atualizar nossos termos de serviço e política de privacidade ocasionalmente. Você será notificado sobre quaisquer alterações significativas por meio de avisos em nosso site.
      </p>

      <h2 className="text-2xl font-nacelle mb-4">Contato</h2>
      <p className="mb-4 text-justify">
        Se você tiver dúvidas sobre estes termos ou nossa política de privacidade, entre em contato conosco pelo email: contato@seudominio.com.
      </p>
    </div>
  );
}