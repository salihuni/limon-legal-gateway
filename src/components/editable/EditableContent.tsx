
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import EditableField from './EditableField';
import EditableTextarea from './EditableTextarea';
import { useContent } from '@/context/ContentContext';

interface EditableContentProps {
  contentKey: string;
  section?: string;
  defaultValue?: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
  children?: React.ReactNode;
}

/**
 * EditableContent component that displays content from the content system
 * with inline editing capabilities for admin users.
 */
const EditableContent: React.FC<EditableContentProps> = ({
  contentKey,
  section = 'common',
  defaultValue = '',
  tag = 'span',
  className = '',
  multiline = false,
  children
}) => {
  const { t, language } = useLanguage();
  const { groupedContent } = useContent();
  
  // Get content from the context if available
  const contentValue = groupedContent[section]?.[contentKey]?.[language]?.value || 
                      (typeof children === 'string' ? children : defaultValue);
  
  // Fallback content value
  const finalValue = contentValue || t(`${section}.${contentKey}`) || defaultValue;
  
  return multiline ? (
    <EditableTextarea
      section={section}
      contentKey={contentKey}
      defaultValue={finalValue}
      className={className}
      tag={tag}
    />
  ) : (
    <EditableField
      section={section}
      contentKey={contentKey}
      defaultValue={finalValue}
      className={className}
      tag={tag}
    />
  );
};

export default EditableContent;
