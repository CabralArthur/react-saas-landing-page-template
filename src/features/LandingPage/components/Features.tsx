import { Card, CardContent } from "@/components/ui/card"

export default function Features() {
    return (
      <div className="py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-blue-400">Example title</h2>
          <p className="mt-2 max-w-lg text-pretty text-4xl font-medium tracking-tight sm:text-5xl">
            Lorem ipsum dolor sit amet.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="flex p-px lg:col-span-4">
              <Card className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] w-full">
                <CardContent className="p-0">
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/component-images/bento-02-releases.png"
                    className="h-80 object-cover object-left"
                  />
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-slate-400">Example 1</h3>
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-white">Lorem ipsum</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
                      egestas sem pellentesque.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex p-px lg:col-span-2">
              <Card className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 lg:rounded-tr-[2rem] w-full">
                <CardContent className="p-0">
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/component-images/bento-02-integrations.png"
                    className="h-80 object-cover object-center"
                  />
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-slate-400">Example 2</h3>
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-white">Lorem ipsum</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                      Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex p-px lg:col-span-2">
              <Card className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 lg:rounded-bl-[2rem] w-full">
                <CardContent className="p-0">
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/component-images/bento-02-security.png"
                    className="h-80 object-cover object-center"
                  />
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-slate-400">Example 3</h3>
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-white">Lorem ipsum</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex p-px lg:col-span-4">
              <Card className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] w-full">
                <CardContent className="p-0">
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
                    className="h-80 object-cover object-left"
                  />
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-slate-400">Example 4</h3>
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-white">Lorem ipsum</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                      Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo vulputate. Maecenas at
                      augue sed elit dictum vulputate.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }