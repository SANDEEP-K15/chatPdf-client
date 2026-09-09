'use client';

import { SignUp } from '@clerk/nextjs';
import { FileText, Sparkles, Shield, Zap, Lock } from 'lucide-react';
import * as React from 'react';

export default function SignUpPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - Branding & Features */}
        <div className="hidden lg:flex flex-col items-start justify-center space-y-8 px-6 xl:px-12">
          {/* Logo & Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl">
                  <FileText className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PDF RAG Chat
                </h1>
                <p className="text-base text-muted-foreground mt-1 font-medium">
                  Enterprise-Grade Document Intelligence
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature List */}
          <div className="space-y-6 w-full">
            <div className="flex items-start space-x-4 group">
              <div className="mt-0.5 p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-950/70 transition-colors">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1.5 text-foreground">AI-Powered Search</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask complex questions and receive intelligent, context-aware answers extracted directly from your documents.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="mt-0.5 p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/70 transition-colors">
                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1.5 text-foreground">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Process and index documents instantly. Get answers in seconds, not minutes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="mt-0.5 p-2.5 bg-purple-50 dark:bg-purple-950/50 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-950/70 transition-colors">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1.5 text-foreground">Secure & Private</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your documents are encrypted and stored securely. Your data remains private and confidential.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="mt-0.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl group-hover:bg-slate-100 dark:group-hover:bg-slate-800/70 transition-colors">
                <Lock className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1.5 text-foreground">Enterprise Ready</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built for teams and organizations. Scale from individual use to enterprise deployments.
                </p>
              </div>
            </div>
          </div>
          
          {/* Testimonial/Quote */}
          <div className="pt-6 border-t border-border w-full">
            <div className="flex items-start space-x-3">
              <div className="text-3xl text-muted-foreground/50 leading-none">&quot;</div>
              <p className="text-sm text-muted-foreground italic leading-relaxed flex-1">
                Transform your static documents into an interactive, intelligent knowledge base that works for you.
              </p>
              <div className="text-3xl text-muted-foreground/50 leading-none">&quot;</div>
            </div>
          </div>
        </div>
        
        {/* Right side - Sign Up Form */}
        <div className="flex flex-col items-center justify-center w-full min-h-[600px]">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-md opacity-50"></div>
                  <div className="relative p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    PDF RAG Chat
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Sign Up Card */}
            <div className="bg-card border border-border rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10">
              <div className="mb-6 md:mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                  Create Your Account
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Join thousands of professionals who trust PDF RAG Chat for their document intelligence needs
                </p>
              </div>
              
              <div className="flex justify-center w-full">
                {mounted ? (
                  <SignUp 
                    routing="hash"
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-none bg-transparent w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border hover:border-border hover:bg-accent transition-all duration-200 rounded-lg mb-2",
                        formButtonPrimary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg font-medium",
                        formFieldInput: "border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all duration-200",
                        formFieldLabel: "text-foreground font-medium",
                        footerActionLink: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium",
                        formFieldErrorText: "text-red-600 dark:text-red-400 text-sm",
                        identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
                        formResendCodeLink: "text-blue-600 hover:text-blue-700",
                      },
                    }}
                  />
                ) : (
                  <div className="w-full flex items-center justify-center py-12">
                    <div className="animate-pulse text-muted-foreground">Loading...</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
