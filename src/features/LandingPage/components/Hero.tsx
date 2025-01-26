import HeroSourceImage from '@/assets/img/example-hero.jpg';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative isolate" id="#product">
        <div className="py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight light:text-gray-900 sm:text-6xl">
                Lorem ipsum dolor sit amet elit.
              </h1>
              <p className="mt-6 text-lg leading-8 light:text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button variant="default" size="lg" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="link" className="text-sm font-semibold leading-6 light:text-gray-900" asChild>
                  <Link to="/signup">Join the system →</Link>
                </Button>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset dark:ring-slate-800 ring-gray-200 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  alt="App screenshot"
                  src={HeroSourceImage}
                  width={2432}
                  height={1000}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10 object-cover max-h-132.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
