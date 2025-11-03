import { BuilderComponent as BuilderReactComponent, builder, useIsPreviewing } from '@builder.io/react';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Configure Builder.io API key
const PUBLIC_BUILDER_KEY = '64acbf47412843a9a0fbf6f4c8852e80';
builder.init(PUBLIC_BUILDER_KEY);

interface BuilderPageProps {
  model: string;
  name?: string;
}

export function BuilderComponent({ model, name }: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    // Initialize Builder.io
    if (!builder.apiKey) {
      builder.init(PUBLIC_BUILDER_KEY);
    }
  }, []);

  if (!name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-orange-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BuilderReactComponent
        model={model}
        content={name}
        options={{
          includeRefs: true,
        }}
        onLoad={(data) => {
          console.log(`[Builder.io] Loaded ${model}: ${name}`, data);
        }}
        onError={(error) => {
          console.error(`[Builder.io] Error loading ${model}: ${name}`, error);
        }}
      />
    </div>
  );
}

export default BuilderComponent;
