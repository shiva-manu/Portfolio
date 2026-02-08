export default function Footer() {
    return (
        <footer className="py-8 border-t border-border bg-muted/40 text-center text-sm text-muted-foreground">
            <div className="container mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    )
}
