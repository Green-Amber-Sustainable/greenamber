import Markdown from 'react-markdown'
import Header from "../../components/Header"

const Terms = () => {
  const term = `
# Terms of Service

## 1. Introduction

Welcome to GreenAmber Community! These Terms of Service ("Terms") govern your use of our website and services ("Services"). By using our Services, you agree to these Terms. If you do not agree, please do not use our Services.

## 2. User Accounts

- **Registration**: You may need to create an account to use certain features of our Services. You must provide accurate information when creating an account.
- **Account Security**: You are responsible for maintaining the security of your account and for all activities that occur under your account.
- **Termination**: We reserve the right to terminate or suspend your account at any time if you violate these Terms.

## 3. Use of Services

- **Eligibility**: You must be at least 13 years old to use our Services.
- **Prohibited Activities**: You agree not to use our Services for any unlawful or prohibited activities, including but not limited to spamming, hacking, or infringing on intellectual property rights.

## 4. Content

- **User Content**: You retain ownership of any content you submit or post to our Services ("User Content"). By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your User Content.
- **Prohibited Content**: You agree not to post any content that is illegal, harmful, or violates the rights of others.
- **Project Submissions**: By submitting your waste-to-energy project, you agree to allow Green Amber Community to showcase your project on our platform for the purpose of recognition and support from others.

## 5. Privacy

- **Data Collection**: We collect and use your personal information in accordance with our Privacy Policy. By using our Services, you consent to such collection and use.
- **Cookies**: Our Services may use cookies to enhance your user experience. By using our Services, you consent to our use of cookies.

## 6. Intellectual Property

- **Our Content**: All content and materials on our Services, including text, graphics, logos, and software, are the property of Green Amber Community or our licensors and are protected by intellectual property laws.
- **User Content**: You retain ownership of your User Content, but you grant us a license to use it as described above.

## 7. Disclaimers

- **No Warranty**: Our Services are provided "as is" without any warranties, express or implied.
- **Limitation of Liability**: We are not liable for any damages arising from your use of our Services.

## 8. Changes to Terms

We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website. Your continued use of our Services after such changes constitutes your acceptance of the new Terms.

## 9. Contact Us

If you have any questions about these Terms, please contact us at **support@greenamber.org**.

---

© 2024 Green Amber Community. All rights reserved.

  `

  return (
    <>
      <div className="w-full md:w-600">
        <Header title="Terms of Use" />

        <div
          className="h-[92vh] overflow-y-auto p-4 border-b border-dim-200 transition duration-350 ease-in-out pb-4 border-l border-r">
          <Markdown className="flex flex-col prose prose-strong:text-amber-600 prose-h1:text-gray-500 prose-h2:text-gray-500 text-gray-400">
            {term}
          </Markdown>
        </div>
      </div>
    </>
  )
}

export default Terms;