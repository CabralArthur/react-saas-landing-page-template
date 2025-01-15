import HeroSourceImage from '@/assets/img/example-hero.jpg';

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
                <a
                  href="#"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Sign in
                </a>
                <a href="#" className="text-sm font-semibold leading-6 light:text-gray-900">
                  Join the system <span aria-hidden="true">→</span>
                </a>
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
