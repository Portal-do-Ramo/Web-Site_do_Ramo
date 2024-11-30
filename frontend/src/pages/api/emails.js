import { Resend } from 'resend';
import Welcome from '../../emails/Welcome';


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req, res) {
  try {
    const { email } = await req.json(); 

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email é obrigatório' });
    }

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Teste!',
    react: <Welcome />,
  });
  console.log('Resposta da API de e-mail:', res); 
  return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
} catch (error) {
  console.error('Erro ao processar o envio do e-mail:', error); 
  return res.status(500).json({ success: false, message: error.message });
}
}
