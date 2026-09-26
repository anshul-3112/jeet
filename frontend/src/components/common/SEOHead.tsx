import React, { useEffect } from 'react';
import { businessConfig } from '../../data/business';

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article' | 'service';
  schema?: Record<string, any>;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = businessConfig.metaDescription,
  canonicalPath = '',
  type = 'website',
  schema,
  noIndex = false
}) => {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noIndex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else if (metaRobots) {
      metaRobots.remove();
    }

    // Update OpenGraph
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:type', type);

    // Update JSON-LD structured data
    const baseLocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': businessConfig.name,
      'alternateName': businessConfig.nameMr,
      'description': businessConfig.bio,
      'telephone': [businessConfig.formattedPrimaryPhone, businessConfig.formattedAlternatePhone],
      'email': businessConfig.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': businessConfig.address.street,
        'addressLocality': businessConfig.address.city,
        'postalCode': businessConfig.address.pincode,
        'addressRegion': businessConfig.address.state,
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 21.1185,
        'longitude': 79.1126
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        'opens': '00:00',
        'closes': '23:59'
      },
      'founder': {
        '@type': 'Person',
        'name': businessConfig.owner
      },
      'priceRange': '₹₹'
    };

    const finalSchema = schema ? { ...baseLocalBusinessSchema, ...schema } : baseLocalBusinessSchema;

    let scriptTag = document.querySelector('script[type="application/ld+json"]#seo-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'seo-schema');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(finalSchema);

  }, [title, description, canonicalPath, type, schema, noIndex]);

  return null;
};
