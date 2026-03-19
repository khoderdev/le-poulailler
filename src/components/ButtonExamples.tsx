import { FiTrash2, FiPlus, FiSend, FiSettings, FiDownload, FiExternalLink, FiAlertTriangle, FiHeart, FiMenu, FiArrowRight } from "react-icons/fi";
import Button from "./Button";

export default function ButtonExamples() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* ---------------------------------------------------------- */}
      {/*  Variants                                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Sizes                                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Sizes</h2>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </div>
        <Button size="full">Full Width</Button>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Icon + Text                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Icon + Text</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<FiPlus />}>Add Item</Button>
          <Button variant="danger" icon={<FiTrash2 />}>
            Delete
          </Button>
          <Button variant="secondary" icon={<FiDownload />}>
            Download
          </Button>
          <Button variant="warning" icon={<FiAlertTriangle />}>
            Warn
          </Button>
          <Button variant="ghost" icon={<FiSettings />}>
            Settings
          </Button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Icon position: right                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Icon Right</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<FiSend />} iconPosition="right">
            Send
          </Button>
          <Button variant="secondary" icon={<FiArrowRight />} iconPosition="right">
            Next Step
          </Button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Icon-only                                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<FiHeart />} size="xs" aria-label="Like" />
          <Button icon={<FiMenu />} variant="ghost" aria-label="Menu" />
          <Button icon={<FiTrash2 />} variant="danger" size="lg" aria-label="Delete" />
          <Button icon={<FiSettings />} variant="secondary" size="xl" aria-label="Settings" />
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Link-style buttons                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Link Buttons (renders &lt;a&gt;)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="https://example.com" target="_blank" rel="noopener">
            Visit Site
          </Button>
          <Button href="https://example.com" variant="ghost" icon={<FiExternalLink />} iconPosition="right">
            Open Link
          </Button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Loading state                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Loading</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Saving…</Button>
          <Button variant="danger" loading>
            Deleting…
          </Button>
          <Button variant="secondary" loading icon={<FiDownload />}>
            Downloading…
          </Button>
          <Button loading icon={<FiSend />} aria-label="Sending" />
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Disabled state                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="danger" disabled icon={<FiTrash2 />}>
            Can't Delete
          </Button>
          <Button variant="ghost" disabled>
            Ghost Disabled
          </Button>
          <Button href="https://example.com" disabled>
            Link Disabled
          </Button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Custom className override                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Custom className</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="rounded-full">Pill Shape</Button>
          <Button variant="danger" size="xs" className="font-bold uppercase">
            Bold XS
          </Button>
          <Button variant="warning" className="shadow-lg">
            Extra Shadow
          </Button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Mixed sizes with icons                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Sizes with Icons</h2>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs" icon={<FiPlus />}>
            XS
          </Button>
          <Button size="sm" icon={<FiPlus />}>
            SM
          </Button>
          <Button size="md" icon={<FiPlus />}>
            MD
          </Button>
          <Button size="lg" icon={<FiPlus />}>
            LG
          </Button>
          <Button size="xl" icon={<FiPlus />}>
            XL
          </Button>
        </div>
      </section>
    </div>
  );
}
