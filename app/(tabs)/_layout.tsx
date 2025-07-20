import { Redirect, Slot } from 'expo-router';
import React from 'react';

export default function RootLayout() {
    const isAuthenticated = false;

    if (!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Slot />
    )
}