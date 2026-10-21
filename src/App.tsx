import { useRoute } from '@/lib/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { HomePage } from '@/pages/HomePage';
import { StoryPage } from '@/pages/StoryPage';
import { DestinationsPage } from '@/pages/DestinationsPage';
import { ServicesIndexPage } from '@/pages/ServicesIndexPage';
import { PetStayPage, SpaPage, DaycarePage, PetParkPage, EventsPage } from '@/pages/ServicePages';
import { VinClubPage } from '@/pages/VinClubPage';
import { PoliciesPage } from '@/pages/PoliciesPage';

function App() {
  const [route, navigate] = useRoute();

  let page: React.ReactNode;
  switch (route.name) {
    case 'home':
      page = <HomePage navigate={navigate} />;
      break;
    case 'story':
      page = <StoryPage navigate={navigate} />;
      break;
    case 'destinations':
      page = <DestinationsPage />;
      break;
    case 'services':
      page = <ServicesIndexPage navigate={navigate} />;
      break;
    case 'service':
      switch (route.slug) {
        case 'pet-stay':
          page = <PetStayPage navigate={navigate} />;
          break;
        case 'spa':
          page = <SpaPage />;
          break;
        case 'daycare':
          page = <DaycarePage />;
          break;
        case 'pet-park':
          page = <PetParkPage />;
          break;
        case 'events':
          page = <EventsPage />;
          break;
        default:
          page = <ServicesIndexPage navigate={navigate} />;
      }
      break;
    case 'vinclub':
      page = <VinClubPage navigate={navigate} />;
      break;
    case 'policies':
      page = <PoliciesPage />;
      break;
    default:
      page = <HomePage navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header current={route.name} navigate={navigate} />
      <main>{page}</main>
      <Footer navigate={navigate} />
      <ChatWidget />
    </div>
  );
}

export default App;
