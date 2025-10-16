const Footer = () => {
  return (
    <footer className='border-t bg-white/60'>
      <div className='mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8'>
        <div className='flex h-14 items-center justify-between text-xs text-gray-500'>
          <span>© {new Date().getFullYear()} DREAM TRIO</span>
          {/* <div className='flex items-center gap-3'>
                      <a className='hover:text-gray-700' href='#'>
                        도움말
                      </a>
                      <span className='text-gray-300'>•</span>
                      <a className='hover:text-gray-700' href='#'>
                        이용약관
                      </a>
                    </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
