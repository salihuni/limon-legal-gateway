
import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface EditableFieldProps {
  section: string;
  contentKey: string;
  defaultValue: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

const EditableField: React.FC<EditableFieldProps> = ({
  section,
  contentKey,
  defaultValue,
  className,
  tag: Tag = 'span'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [isAdmin, setIsAdmin] = useState(false);
  const { saveContent } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is logged in and is an admin
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAdmin(!!data.session);
    };
    
    checkAdmin();
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    }
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (value !== defaultValue) {
      try {
        // Get current language from URL or context
        const lang = document.documentElement.lang || 'en';
        await saveContent(section, contentKey);
      } catch (error) {
        console.error('Failed to save content:', error);
        // Revert to original value on error
        setValue(defaultValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setValue(defaultValue);
      setIsEditing(false);
    }
  };

  if (!isAdmin) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <div
      className={cn("group relative inline-block", isEditing ? "ring-2 ring-limon-gold" : "")}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn("w-full p-0 m-0 border-none min-w-[100px]", className)}
        />
      ) : (
        <>
          <Tag className={cn(className, "inline-block cursor-pointer hover:bg-yellow-50/30")}>{value}</Tag>
          <Pencil className="absolute top-0 right-0 h-4 w-4 text-limon-gold bg-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transform -translate-y-1/2 translate-x-1/2" />
        </>
      )}
    </div>
  );
};

export default EditableField;
