import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
 import { Amplify, Auth } from 'aws-amplify';
 import awsmobile from '../../src/aws-exports';
 
 Amplify.configure(awsmobile);
 
 Cypress.Commands.add('authenticate', async (user) => {
   const ssmClient =
     new SSMClient({
       credentials: Cypress.env('awscredentials'),
       region: awsmobile.aws_project_region
     });
 
   const command = new GetParameterCommand ({
     Name: `/amplify/testProject/${user}`,
     WithDecryption: true
   });
   const { Parameter } = await ssmClient.send(command);
   return await Auth.signIn(user, Parameter?.Value);
 })