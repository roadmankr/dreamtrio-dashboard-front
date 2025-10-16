import MobileNav from '@/widgets/navigation/ui/mobile-nav';
import WebNav from '@/widgets/navigation/ui/web-nav';

const Navigation = () => {
  return (
    <nav>
      <WebNav />
      <MobileNav />
    </nav>
  );
};

export default Navigation;
