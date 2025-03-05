import { AlertTriangle, ArrowLeft, BookOpen, FileCheck,Info, Scale, ShieldCheck, UserCheck } from "lucide-react";
import { useEffect } from "react";

function TermsofService() {
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
            <ShieldCheck className="mr-3 h-7 w-7 text-emerald-400" />
            Terms of Service
          </h2>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        <div className="p-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-blue-500" />
                Acceptance of Terms
              </h3>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using our service, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and our service. If you do not agree to these terms, please refrain from using our service.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-yellow-500" />
                Changes to Terms
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes become effective immediately upon posting. Your continued use of the service after any modifications indicates your acceptance of the updated terms.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Scale className="mr-3 h-6 w-6 text-purple-500" />
                Description of Service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our service provides a comprehensive ride-sharing platform connecting drivers and passengers. We maintain the right to modify, update, or discontinue any aspect of the service to ensure the best possible user experience.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <UserCheck className="mr-3 h-6 w-6 text-green-500" />
                User Conduct
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Users must conduct themselves professionally and respectfully. Any form of harassment, abuse, or illegal activity is strictly prohibited. We reserve the right to suspend or terminate accounts that violate these guidelines.
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileCheck className="mr-3 h-6 w-6 text-indigo-500" />
                Privacy Policy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms of Service, details how we collect, use, and protect your personal information when you use our service.
              </p>
            </section>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Last updated: January 26, 2025</p>
          <div className="flex items-center text-sm text-gray-500">
            <Info className="h-4 w-4 mr-2" />
            These terms are regularly reviewed and updated
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsofService;