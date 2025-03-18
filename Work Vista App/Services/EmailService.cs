using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
 
namespace Work_Vista_App.Services { 
   public class EmailService
 {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
                {
                    _configuration = configuration;
                }
            public async Task SendEmailAsync(string toEmail, string subject, string message)
                {

            //Console.WriteLine("Starting to send email...");

            var smtpClient = new SmtpClient()




            {




                Host = _configuration["Smtp:Host"],




                Port = int.Parse(_configuration["Smtp:Port"]),




                Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"]),




                EnableSsl = true,




            };

            var mailMessage = new MailMessage




            {




                From = new MailAddress(_configuration["Smtp:FromEmail"]),




                Subject = subject,




                Body = message,




                IsBodyHtml = true, // properties of class mailmsg




            };




            mailMessage.To.Add(toEmail);

            //Console.WriteLine($"Sending email to {toEmail} with subject '{subject}'");

            await smtpClient.SendMailAsync(mailMessage);

            //Console.WriteLine("Email sent successfully.");




        }




    }




}
