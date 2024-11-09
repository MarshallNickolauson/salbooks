function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='py-4'>
            <div className='container mx-auto text-center'>
                <p>&copy; {currentYear} Studies in Abundant Living</p>
            </div>
        </footer>
    );
}

export default Footer;
