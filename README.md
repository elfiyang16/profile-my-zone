<h1 align="center">Dev Zone Blog</h1>

[Personal profile site](https://www.elfiy.com/) with Typescript, Jest, ESlint and other useful configurations.

It is used as an archive for my blogs published on [Medium](https://elfi-y.medium.com/) (there are 100+ on medium now but I haven't had an API up and running to migrate the content easily to here).

It use _Contentful_ CMS and tested with Enzyme and Jest, and deployed to AWS S3.

![static-website](https://user-images.githubusercontent.com/29664811/145848489-fe212608-8efc-470f-8a14-f8a6612fc259.png)

### Features

- Pagination
- SEO componenet
- JSon-LD schema
- Sitemap Generation
- Responsive design
- PWA feature
- Disqus forum
- Social share

### Prerequisites

- Install these extensions:
  - [EditorConfig](https://editorconfig.org/)
  - [Prettier](https://prettier.io/)
  - [ESLint](https://eslint.org/)

### Getting Started

1.  **Install.**

After clone the site, run:

    ```sh
    npm install
    ```

2.  **Start**

    ```sh
    npm start
    ```

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`\_. This is a tool you can use to experiment with querying your data.

3.  **Test**

    ```sh
    npm run test
    ```

    This will run `ESlint` and `Jest` all together.

4.  **Type-Checking and Linting**

    The `package.json` in this starter includes scripts for performing type-checking and linting on your project.

    To check for correct typing run `npm run type-check` on the command line.

    To check for correct code formatting with ESLint, run `npm run lint` on the command line.

5.  **Deploy**

    ```sh
    npm run build
    ```

    This will build the production build. And with `git push` on `master` branch,  
    the change will deployed to Netlify automatically with `Github Actions`.

### Project Structure

A quick look at the top-level files and directories:

    .
    ├── __mocks__
    ├── .github
    ├── node_modules
    ├── src
    |-- infrastructure
    ├── .env.example
    ├── .editorconfig
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── jest-preprocess.js
    ├── jest.config.js
    ├── jest.setup.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    └── README.md

Inside the `src`:

    ├── components
    ├── helpers
    ├── images
    ├── pages
    ├── scss
    ├── templates
    ├── types
    ├── tsconfig.json

Files in both `pages` and `templates` will be compiled into top level sites.

### Deployment

The project is deployed to AWS and distributed through Cloudfront to get best user experience.

Terraform is used and a local TF backend is maintained.
