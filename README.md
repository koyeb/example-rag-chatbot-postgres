<div align="center">
  <a href="https://koyeb.com">
    <img src="https://www.koyeb.com/static/images/icons/koyeb.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Koyeb Serverless Platform</h3>
  <p align="center">
    Deploy a RAG chatbot using Remix and Tailwind on Koyeb
    <br />
    <a href="https://koyeb.com">Learn more about Koyeb</a>
    ·
    <a href="https://koyeb.com/docs">Explore the documentation</a>
    ·
    <a href="https://koyeb.com/tutorials">Discover our tutorials</a>
  </p>
</div>


## About Koyeb and the RAG chatbot with Remix and Tailwind example application

Koyeb is a developer-friendly serverless platform to deploy apps globally. No ops, servers, or infrastructure management required.  This repository contains a RAG chatbot that you can deploy on the Koyeb serverless platform for testing.

This example application is designed to show how an application using Remix and Tailwind can be deployed on Koyeb.

## Getting Started

Follow the steps below to deploy and run the Remix application with Tailwind on your Koyeb account.

### Requirements

To successfully deploy and run this application, you need:

* A Koyeb account: If you don't already have an account, you can sign-up for free [here](https://app.koyeb.com/auth/signup).
* An [OpenAI](https://platform.openai.com) API key.
* A [Replicate](https://replicate.com) API key.

### Deploy using the Koyeb button

The fastest way to deploy the Remix and Tailwind application is to click the **Deploy to Koyeb** button below.

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=chatbot-on-koyeb&type=git&repository=koyeb%2Fexample-rag-chatbot-postgres&branch=main&env%5BPOSTGRES_URL%5D=CHANGE_ME&env%5BREPLICATE_API_TOKEN%5D=CHANGE_ME&env%5BOPENAI_API_KEY%5D=CHANGE_ME)

Clicking on this button brings you to the Koyeb App creation page with everything pre-set to launch this application.  Modify the environment variables to point to your own values before launching the application.

_To modify this application example, you will need to fork this repository. Checkout the [fork and deploy](#fork-and-deploy-to-koyeb) instructions._

### Fork and deploy to Koyeb

If you want to customize and enhance this application, you need to fork this repository.

If you used the **Deploy to Koyeb** button, you can simply link your service to your forked repository to be able to push changes.
Alternatively, you can manually create the application as described below.

On the [Koyeb Control Panel](https://app.koyeb.com/), on the **Overview** tab, click the **Create Web Service** button to begin.

1. Select **GitHub** as the deployment method.
2. In the repositories list, select the repository you just forked.
3. In the **Environment variables** section, click **Add variable** to add the `POSTGRES_URL`, `OPENAI_API_KEY`, and `REPLICATE_API_TOKEN` variables with your values.  For the `POSTGRES_URL` value, be sure to append `?sslmode=require` to the connection string to ensure that the application connects with the correct settings.
4. Choose a name for your App and Service, for example, `rag-chatbot`, and click **Deploy**.

You land on the deployment page where you can follow the build of your application. Once the build is completed, your application is being deployed and you will be able to access it via `<YOUR_APP_NAME>-<YOUR_ORG_NAME>.koyeb.app`.

## Contributing

If you have any questions, ideas or suggestions regarding this application sample, feel free to open an [issue](https://github.com/koyeb/example-rag-chatbot-postgres/issues) or fork this repository and open a [pull request](https://github.com/koyeb/example-rag-chatbot-postgres/pulls).

## Contact

[Koyeb](https://www.koyeb.com) - [@gokoyeb](https://twitter.com/gokoyeb) - [Slack](http://slack.koyeb.com/)
