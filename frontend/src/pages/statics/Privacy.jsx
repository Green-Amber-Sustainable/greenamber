import Markdown from 'react-markdown'
import Header from "../../components/Header"

const Privacy = () => {
  const policy = `

# Privacy Policy

**Effective Date:** 2024-08-12

## Introduction

At **GreenAmber.org**, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.

## Information We Collect

### Personal Information
We may collect personal information that you provide directly to us when you:
- Subscribe to our newsletter
- Fill out a contact form
- Participate in surveys or engage with us on social media

This information may include:
- Name
- Email address
- Any other information you provide

### Non-Personal Information
We may collect non-personal information automatically when you visit our website, such as:
- IP address
- Browser type
- Operating system
- Pages visited and the time spent on those pages

## How We Use Your Information

We may use the information we collect from you in the following ways:
- To personalize your experience on our site
- To improve our website based on your feedback
- To send periodic emails regarding news, updates, and services
- To respond to your inquiries and provide customer support
- To analyze usage patterns and trends to improve site functionality

## Cookies

Our website may use "cookies" to enhance user experience. A cookie is a small text file that is stored on your device for record-keeping purposes. You may choose to set your browser to refuse cookies or alert you when cookies are being sent. However, if you do so, some parts of the website may not function properly.

## Third-Party Services

We may use third-party service providers to help operate our website, such as analytics services (e.g., Google Analytics) that may collect and process your data. These third-party service providers have their own privacy policies addressing how they use such information.

## Data Security

We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security of your data.

## Your Rights

You have the right to:
- Access the personal information we hold about you
- Request correction of any inaccuracies in your data
- Request the deletion of your personal information
- Opt out of receiving marketing communications from us

To exercise these rights, please contact us at support@greenamber.org.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. When we do, we will revise the "Effective Date" at the top of this page. We encourage you to review this policy periodically to stay informed about how we are protecting your information.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at:

**Email:** support@greenamber.org  
**Address:** Persada Raya C5 No. 32, Periuk, Kota Tangerang, Indonesia 15133.
  `

  return (
    <>
      <div className="w-full md:w-600">
        <Header title="Our Community" />

        <div
          className="h-[92vh] overflow-y-auto p-4 border-b border-dim-200 transition duration-350 ease-in-out pb-4 border-l border-r">
          <Markdown className="flex flex-col prose prose-strong:text-amber-600 prose-h1:text-gray-500 prose-h2:text-gray-500 prose-h3:text-gray-500 text-gray-400">
            {policy}
          </Markdown>
        </div>
      </div>
    </>
  )
}

export default Privacy;