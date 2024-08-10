# GreenAmber.org

```
==============================================================
  GreenAmber.org - Web Application
==============================================================

Welcome to the GreenAmber.org repository! This is the official backup and public feedback repository for the GreenAmber.org website, which focuses on promoting the waste-to-energy movement. While this repository is open-sourced and open for contributions, please note that it is not directly connected to the production site.

```

<div align="center">

### Open-source platform for waste to energy project enthusiasts.

<p>

<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/Green-Amber-Sustainable/greenamber" /> 
<img alt="" src="https://img.shields.io/github/repo-size/Green-Amber-Sustainable/greenamber" /> <img alt="GitHub Issues" src="https://img.shields.io/github/issues/Green-Amber-Sustainable/greenamber" /> <img alt="Github License" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

</div>

-----

## About GreenAmber.org

GreenAmber.org is a platform dedicated to educating and advocating for the waste-to-energy movement. Our mission is to turn today's waste into tomorrow's energy, helping to create a cleaner, greener planet. You can learn more about us by visiting our website: [GreenAmber.org](https://www.greenamber.org).

## Repository Purpose

This repository serves two primary purposes:

1. **Backup**: To maintain a version-controlled backup of the website’s codebase.
2. **Public Feedback**: To provide a platform for the community to offer suggestions, report issues, and contribute to the ongoing improvement of the site.

## Contributing

We welcome contributions from everyone! If you have ideas, suggestions, or improvements, feel free to open an issue or submit a pull request. Here’s how you can get started:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create a copy of the repository on your GitHub account.
2. **Clone your fork**: Use the command `git clone https://github.com/your-username/greenamber.org.git` to clone the fork to your local machine.
3. **Create a branch**: Use `git checkout -b your-feature-name` to create a new branch for your changes.
4. **Make your changes**: Make your changes to the codebase.
5. **Commit your changes**: Use `git commit -m 'Description of your changes'` to commit your changes.
6. **Push to GitHub**: Use `git push origin your-feature-name` to push your changes to your fork.
7. **Create a Pull Request**: Go to the original repository and click "New Pull Request" to submit your changes for review.

Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

## How to Start
### Running the backend service

```bash
pm2 start "gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app :1666 --timeout 300" --name green-amber
```

### Starting the frontend

```bash
cd frontend

npm install or yarn

npm run dev
```

## Issues

If you encounter any issues or have any questions, please open an issue in this repository. We’ll do our best to address it as quickly as possible.

## License

This repository is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

## Contact

If you have any questions or need further assistance, please reach out to us through the contact information available on [GreenAmber.org](https://www.greenamber.org).

Thank you for your interest and contributions to GreenAmber.org!