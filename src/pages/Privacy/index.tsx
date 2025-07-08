
const Privacy = () => {
  return (
    <section className="container mx-auto px-4 py-8">
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: July 7, 2025</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="text-green-800 font-semibold mb-1">
                Your Privacy is Our Priority
              </h3>
              <p className="text-green-700 text-sm">
                We are committed to protecting your personal information and
                maintaining transparency about our data practices. Your account
                information is private and never shared publicly on our
                platform.
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          SalaryDental ("we," "our," or "us") is committed to protecting your 
privacy and maintaining the confidentiality of your personal 
information. This Privacy Policy explains how we collect, use, 
disclose, and safeguard your information when you visit our website,
create an account, or use our services. We believe in transparency 
and want you to feel confident about how your data is handled.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          2. Information We Collect
        </h2>
        <p className="mb-4">
          We collect different types of information to provide you with the best
          possible experience:
        </p>
        <h3 className="text-lg font-medium mt-6 mb-3">Account Information</h3>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Registration Data:</strong> When you create an account, we
            collect your name, email address, role (dentist, resident), and authentication information.
          </li>
          <li>
            <strong>Profile Information:</strong> You may choose to provide
            additional information such as your medical specialty, graduation
            year, degree, city, and state to personalize your experience.
          </li>
          <li>
            <strong>Account Activity:</strong> We track your login activity,
            last visit dates, and account preferences to maintain security and
            improve our services.
          </li>
        </ul>
        <h3 className="text-lg font-medium mt-6 mb-3">
          Salary and Professional Data
        </h3>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Salary Submissions:</strong> When you submit salary
            information, we collect compensation details, specialty,
            subspecialty, geographic location, practice setting, and years of
            experience. This data is used to create valuable insights for the
            medical community.
          </li>
          <li>
            <strong>Submission Status:</strong> We track the status of your
            submissions (pending, approved, rejected) and maintain records for
            quality assurance.
          </li>
        </ul>
        <h3 className="text-lg font-medium mt-6 mb-3">Technical Information</h3>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Usage Data:</strong> We automatically collect information
            about your device, browser type, IP address, pages viewed, time
            spent on the site, and interaction patterns.
          </li>
          <li>
            <strong>Cookies and Analytics:</strong> We use cookies and similar
            technologies to enhance your experience, remember your preferences,
            and analyze site usage.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use your information responsibly and only for legitimate purposes:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
             <strong>Opportunities & Updates:</strong> We may contact you via our newsletter to share valuable 
opportunities, industry insights, and resources specifically for dentists
          </li>
          <li>
            <strong>Service Delivery:</strong> To provide, maintain, and improve
            our platform, including personalized dashboards and salary
            comparisons
          </li>
          <li>
            <strong>Account Management:</strong> To manage your account,
            verify your identity, and offer customer support
          </li>
          <li>
            <strong>Data Analysis:</strong>To generate aggregated, anonymized
            statistics and research insights that support the dental community
          </li>
          <li>
            <strong>Communication:</strong>To send you important updates about
            your account, submissions, and new platform features
          </li>
          <li>
            <strong>Security:</strong> To monitor for suspicious activity, prevent
            fraud, and protect your information
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with applicable laws and
            regulations
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          4. Information Sharing and Disclosure
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-800 font-medium">
            🔒 We never sell your personal information to third parties.
          </p>
        </div>
        <p className="mb-4">Here's how we handle information sharing:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Public Display:</strong> Your personal account information
            (name, email, location, etc.) is never displayed publicly on our
            platform
          </li>
          <li>
            <strong>Aggregated Data:</strong> We may share anonymized,
            aggregated salary data for research, industry reports, or
            promotional purposes
          </li>
          <li>
            <strong>Service Providers:</strong> We work with trusted third-party
            service providers (like MongoDB for database hosting) who help us
            operate our platform under strict confidentiality agreements
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if
            required by law, court order, or to protect our rights and the
            safety of our users
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger or
            acquisition, user information may be transferred as part of the
            business assets
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          5. Data Security and Protection
        </h2>
        <p className="mb-4">
          We take data security seriously and implement multiple layers of
          protection:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Encryption:</strong> All data transmission is encrypted
            using industry-standard SSL/TLS protocols
          </li>
          <li>
            <strong>Secure Infrastructure:</strong> We use Supabase, a SOC 2
            compliant platform, for secure data storage and management
          </li>
          <li>
            <strong>Access Controls:</strong> Strict access controls ensure only
            authorized personnel can access user data
          </li>
          <li>
            <strong>Regular Monitoring:</strong> We continuously monitor our
            systems for security threats and vulnerabilities
          </li>
          <li>
            <strong>Data Minimization:</strong> We only collect and retain data
            that is necessary for our services
          </li>
        </ul>
        <p className="mb-4 text-sm text-gray-600">
          While we implement robust security measures, no internet transmission
          or electronic storage is 100% secure. We cannot guarantee absolute
          security but are committed to protecting your information using
          industry best practices.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          6. Your Rights and Choices
        </h2>
        <p className="mb-4">
          You have several rights regarding your personal information:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Access:</strong> You can view and update your account
            information through your dashboard
          </li>
          <li>
            <strong>Correction:</strong> You can edit your profile information,
            including specialty, location, and other details
          </li>
          <li>
            <strong>Deletion:</strong> You can request deletion of your account
            and associated data by contacting us
          </li>
          <li>
            <strong>Data Portability:</strong> You can request a copy of your
            personal data in a machine-readable format
          </li>
          <li>
            <strong>Opt-out:</strong> You can opt out of non-essential
            communications and certain data processing activities
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Data Retention</h2>
        <p className="mb-4">
          We retain your information for as long as necessary to provide our
          services and comply with legal obligations:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Account Data:</strong> Retained while your account is active
            and for a reasonable period after account closure
          </li>
          <li>
            <strong>Salary Data:</strong> Anonymized salary submissions may be
            retained indefinitely for research and statistical purposes
          </li>
          <li>
            <strong>Usage Data:</strong> Typically retained for 2-3 years for
            analytics and improvement purposes
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          8. Third-Party Links and Services
        </h2>
        <p className="mb-4">
          Our website may contain links to third-party websites or integrate
          with external services. We are not responsible for the privacy
          practices or content of these external sites. We encourage you to
          review the privacy policies of any third-party sites you visit.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          9. Children's Privacy
        </h2>
        <p className="mb-4">
          Our services are intended for medical professionals and students who
          are typically 18 years or older. We do not knowingly collect personal
          information from children under 18. If we become aware that we have
          collected such information, we will take steps to delete it promptly.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          10. International Users
        </h2>
        <p className="mb-4">
          SalaryDental is based in the United States. If you are accessing our
          services from outside the US, please be aware that your information
          may be transferred to, stored, and processed in the United States
          where our servers are located and our central database is operated.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          11. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any material changes by:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            Posting the updated policy on this page with a new "Last Updated"
            date
          </li>
          <li>
            Sending you an email notification if the changes significantly
            affect your rights
          </li>
          <li>Displaying a prominent notice on our website</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
        <p className="mb-4">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please don't hesitate to contact
          us:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <ul className="list-none space-y-2">
            <li>
              <strong>Email:</strong> info@salarydental.com
            </li>
            <li>
              <strong>Subject Line:</strong> Privacy Policy Inquiry
            </li>
            <li>
              <strong>Response Time:</strong> We aim to respond within 48 hours
            </li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
          <h3 className="text-green-800 font-semibold mb-2">
            Our Commitment to You
          </h3>
          <p className="text-green-700 text-sm">
            We are committed to maintaining your trust by being transparent
            about our data practices, implementing strong security measures, and
            giving you control over your personal information. Your privacy is
            not just a policy for us—it's a fundamental principle that guides
            everything we do.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Privacy;
