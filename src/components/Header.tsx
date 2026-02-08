"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
    const navItems = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <header className="py-6 px-4 sm:px-8 lg:px-16 flex justify-between items-center fixed w-full top-0 z-50 bg-background/50 backdrop-blur-md border-b border-border/40">

            <Link href="/" className="font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
                Portfolio
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 items-center">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:flex gap-4">
                <Button asChild variant="outline" size="sm">
                    <Link href="https://github.com/shiva-manu" target="_blank">
                        GitHub
                    </Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="#contact">
                        Hire Me
                    </Link>
                </Button>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                        <SheetDescription className="sr-only">Navigation</SheetDescription>
                        <div className="flex flex-col gap-6 mt-8">
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-4">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="https://github.com" target="_blank">
                                        GitHub
                                    </Link>
                                </Button>
                                <Button asChild className="w-full">
                                    <Link href="#contact">
                                        Hire Me
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
