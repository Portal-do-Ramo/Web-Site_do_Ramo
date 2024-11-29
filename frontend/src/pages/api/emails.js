import { Resend } from 'resend';
import Welcome from '../../emails/Welcome';


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST() {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'adm.portaldoramo@gmail.com',
    subject: 'Teste!',
    react: <Welcome />,
  });
}
