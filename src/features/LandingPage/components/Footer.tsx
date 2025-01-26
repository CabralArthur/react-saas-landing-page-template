import { FaFacebook, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"

const navigation = {
    main: [
      { name: 'Product', href: '#' },
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' }
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: FaFacebook
      },
      {
        name: 'Instagram',
        href: '#',
        icon: FaInstagram
      },
      {
        name: 'X',
        href: '#',
        icon: FaXTwitter
      },
      {
        name: 'GitHub',
        href: '#',
        icon: FaGithub
      },
      {
        name: 'YouTube',
        href: '#',
        icon: FaYoutube
      },
    ],
  }
  
  export default function Footer() {
    return (
      <footer className="border-t">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <Button variant="link" asChild>
                  <a href={item.href} className="text-sm leading-6">
                    {item.name}
                  </a>
                </Button>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <Button key={item.name} variant="ghost" size="icon" asChild>
                <a href={item.href}>
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
            &copy; Example, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    )
}