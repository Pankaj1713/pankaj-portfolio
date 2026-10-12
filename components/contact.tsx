"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { portfolioData } from "@/lib/portfolio-data";
import { CONTACT_VALIDATION_SCHEMA } from "@/lib/validation-schemas";
import { AnimatedError } from "./animated-error";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (
    values: { name: string; email: string; message: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (val: boolean) => void; resetForm: () => void },
  ) => {
    try {
      // 1. Format the message clearly for WhatsApp
      const textMessage = `Hi Pankaj,\n\nMy name is ${values.name} (${values.email}).\n\n${values.message}`;

      // 2. Encode the text so it works safely in a URL
      const encodedMessage = encodeURIComponent(textMessage);

      // 3. Construct the WhatsApp API link with your number (no '+' sign needed)
      const whatsappUrl = `https://wa.me/918708583401?text=${encodedMessage}`;

      // 4. Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // Show success message and clear the form
      setSubmitStatus("success");
      resetForm();
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <Linkedin size={24} />;
      case "GitHub":
        return <Github size={24} />;
      case "Email":
        return <Mail size={24} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-x-clip pb-4"
    >
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Title */}
        <StaggerContainer className="text-center mb-16">
          <StaggerItem
            as="h2"
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5"
          >
            Let{"'"}s Work{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Together
            </span>
          </StaggerItem>
          <StaggerItem
            as="p"
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            I{"'"}m always interested in hearing about new projects and
            opportunities. Send me a message and it will come straight to my
            WhatsApp!
          </StaggerItem>
        </StaggerContainer>

        {/* Contact Form */}
        <Reveal className="max-w-2xl mx-auto mb-12">
          <TiltCard
            tiltDegrees={0}
            elevation={0}
            className="rounded-2xl border border-white/10 bg-slate-950/40 shadow-2xl shadow-black/40 backdrop-blur-xl"
            contentClassName="relative z-10 p-6 md:p-8 space-y-5"
          >
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={CONTACT_VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-semibold mb-2"
                  >
                    Your Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border outline-none transition-all placeholder-gray-500 text-white ${
                      touched.name && errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                    }`}
                  />
                  <AnimatedError error={errors.name} touched={touched.name} />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-semibold mb-2"
                  >
                    Your Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border outline-none transition-all placeholder-gray-500 text-white ${
                      touched.email && errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                    }`}
                  />
                  <AnimatedError error={errors.email} touched={touched.email} />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-semibold mb-2"
                  >
                    Your Message
                  </label>
                  <Field
                    id="message"
                    name="message"
                    as="textarea"
                    placeholder="Tell me about your project..."
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border outline-none transition-all placeholder-gray-500 text-white resize-none ${
                      touched.message && errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                    }`}
                  />
                  <AnimatedError
                    error={errors.message}
                    touched={touched.message}
                  />
                </div>

                {/* Submit Status Messages */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm font-medium text-center"
                    >
                      Redirecting to WhatsApp...
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium text-center"
                    >
                      Failed to open WhatsApp. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <MagneticButton
                  as="button"
                  strength={0.08}
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-sheen cta-gradient w-full px-8 py-3 cursor-pointer text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
                </MagneticButton>
              </Form>
            )}
          </Formik>
          </TiltCard>
        </Reveal>

        {/* Contact Info Cards */}
        <StaggerContainer
          staggerChildren={0.1}
          className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
        >
          {/* Email */}
          <StaggerItem
            as="a"
            href={`mailto:${portfolioData.email}`}
            whileTap={{ scale: 0.97 }}
            className="group relative"
          >
            <TiltCard tiltDegrees={5} elevation={5} className="h-full rounded-lg border border-slate-800 bg-slate-900/50 transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]" contentClassName="relative z-10 h-full p-6 text-center">
              <div className="inline-block p-3 bg-cyan-400/10 rounded-lg mb-3 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm">Email</h3>
              <p className="text-gray-400 text-xs break-all mt-1">
                {portfolioData.email}
              </p>
            </TiltCard>
          </StaggerItem>

          <StaggerItem
            as="a"
            href="https://wa.me/918708583401"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="group relative"
          >
            <TiltCard tiltDegrees={5} elevation={5} className="h-full rounded-lg border border-slate-800 bg-slate-900/50 transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]" contentClassName="relative z-10 h-full p-6 text-center">
              <div className="inline-block p-3 bg-cyan-400/10 rounded-lg mb-3 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all duration-300">
                <Phone className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm">WhatsApp</h3>
              <p className="text-gray-400 text-xs mt-1">+91 8708583401</p>
            </TiltCard>
          </StaggerItem>

          <StaggerItem
            as="a"
            whileTap={{ scale: 0.97 }}
            href="https://www.linkedin.com/in/pankzthakur"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <TiltCard tiltDegrees={5} elevation={5} className="h-full rounded-lg border border-slate-800 bg-slate-900/50 transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]" contentClassName="relative z-10 h-full p-6 text-center">
              <div className="inline-block p-3 bg-cyan-400/10 rounded-lg mb-3 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all duration-300">
                <Linkedin className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm">Connect</h3>
              <p className="text-gray-400 text-xs mt-1">LinkedIn</p>
            </TiltCard>
          </StaggerItem>
        </StaggerContainer>

        {/* Social Links */}
        <Reveal direction="none" className="flex justify-center gap-4 mb-8">
          {portfolioData.socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
            >
              {getIcon(link.name)}
            </motion.a>
          ))}
        </Reveal>

        <Reveal direction="none" className="flex justify-center pb-8">
          <p className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-sm text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for freelance work and full-time opportunities
          </p>
        </Reveal>
      </div>
    </section>
  );
}
