import { AlertTriangle, ArrowLeft, CheckCircle, Info, KeyRound, Lock, Shield, UserCheck } from "lucide-react";
import { useEffect } from "react";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="text-gray-300 hover:text-white focus:outline-none transition-colors duration-200 flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-3xl font-bold flex items-center justify-center">
            <KeyRound className="mr-3 h-7 w-7 text-yellow-400" />
            Privacy Policy
          </h2>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        <div className="p-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="mr-3 h-6 w-6 text-green-500" />
                Information Collection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We collect information to provide better services to all our users. This includes basic information like your name and email address, which helps us personalize your experience and improve our services.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-yellow-500" />
                Data Usage
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The information we collect is used to improve our services, personalize your content experience, and provide exceptional customer support tailored to your needs.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Lock className="mr-3 h-6 w-6 text-blue-500" />
                Data Sharing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain strict confidentiality of your personal information. Data sharing with third parties is limited to essential service provision and legal requirements only.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-500" />
                Security Measures
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data security is our priority. We implement industry-standard protection measures to safeguard your information from unauthorized access or misuse.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <UserCheck className="mr-3 h-6 w-6 text-indigo-500" />
                Your Rights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You maintain full control over your personal information with rights to access, correct, or delete your data. Our support team is ready to assist with any privacy-related concerns.
              </p>
            </section>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Last updated: January 26, 2025</p>
          <div className="flex items-center text-sm text-gray-500">
            <Info className="h-4 w-4 mr-2" />
            This policy is regularly reviewed and updated
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;