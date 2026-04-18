import React from 'react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';

const CreativeGoogleButton = ({ label = "Sign in with Google", onSuccess, onError }) => {
    const { googleLogin } = useAuth();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // This returns an access_token. 
            // We need to fetch the ID token or user info if the backend expects it.
            // Ideally, we'd update context/backend to handle access_token.
            // For now, let's assume we can fetch user profile or if we have a way to get credential.
            // Actually, with useGoogleLogin we don't get the JWT 'credential' directly.
            
            // To provide a creative button while keeping the ID token flow, 
            // one trick is to hide the real Google button and trigger it, 
            // but GSI makes this hard.
            
            // So we'll fetch the user info using the access_token and let the backend 
            // handle it if we modify it, OR we fetch it here.
            
            // Better: I'll update the backend to handle the access_token too!
            if (onSuccess) onSuccess(tokenResponse);
        },
        onError: (error) => {
            if (onError) onError(error);
        },
        flow: 'implicit'
    });

    return (
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(244, 196, 48, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => login()}
            className="group relative flex items-center justify-center gap-3 w-full bg-[#1a1510] border border-[#F4C430]/30 py-3.5 px-6 overflow-hidden transition-all duration-300"
        >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4C430]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#F4C430]/50"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#F4C430]/50"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#F4C430]/50"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#F4C430]/50"></div>

            <div className="relative z-10 flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-sm shadow-inner group-hover:rotate-[360deg] transition-transform duration-700">
                    <FcGoogle className="text-xl" />
                </div>
                <span className="text-[#fcf9ee] font-headline text-sm uppercase tracking-[0.15em] font-medium group-hover:text-[#F4C430] transition-colors">
                    {label}
                </span>
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/5 to-transparent transition-opacity"></div>
        </motion.button>
    );
};

export default CreativeGoogleButton;
