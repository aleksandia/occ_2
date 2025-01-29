import { PageHead } from 'components/PageHead'; // Falls nicht in `shared`, Pfad prüfen
import { Layout } from 'components/shared/Layout';
import { Header } from 'components/shared/Header';
import { CustomPortableText } from 'components/shared/CustomPortableText';
import { ScrollUp } from 'components/shared/ScrollUp';
import type { PagePayload, SettingsPayload } from 'types';


interface PageProps {
  page?: PagePayload;
  settings?: SettingsPayload;
  homePageTitle?: string;
  preview?: boolean;
}

export function Page({ page, settings, homePageTitle, preview }: PageProps) {
  const { body, overview, title, gallery } = page || {};

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-14">
            <Header title={title} description={overview} />

            {body && (
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
                value={body}
              />
            )}

            {/* Galerie anzeigen */}
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                {gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image.asset.url}
                    alt={image.alt || "Gallery image"}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}

            <ScrollUp />
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  );
}
