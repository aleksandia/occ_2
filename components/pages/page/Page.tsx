import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { PagePayload, SettingsPayload } from 'types'
import PageHead from './PageHead'
import Image from 'next/image'

export interface PageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export function Page({ page, settings, homePageTitle, preview }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, gallery } = page || {}

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-14">
            {/* Header */}
            <Header title={title} description={overview} />

            {/* Body */}
            {body && (
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
                value={body}
              />
            )}

            {/* Galerie */}
            {gallery?.images && gallery.images.length > 0 && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.images.map((image, index) => (
                  <div key={index} className="relative w-full h-64">
                    <Image
                      src={image.asset.url}
                      alt={image.alt || `Gallery Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
