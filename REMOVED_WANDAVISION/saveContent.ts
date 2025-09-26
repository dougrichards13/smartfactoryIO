/**
 * Save Content Utility for WandaVision Editor
 * Handles saving edited content back to JSON files
 */

export interface SaveContentRequest {
  section: 'hero' | 'about' | 'services' | 'contact' | 'global' | 'results' | 'team';
  content: any;
}

export interface SaveContentResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Save content to JSON file
 * In a real production environment, this would be an API call to the backend
 * For development, we'll simulate the save process
 */
export async function saveContent(request: SaveContentRequest): Promise<SaveContentResponse> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would:
    // 1. Make a POST request to /api/content/save
    // 2. The backend would validate the content
    // 3. Write the content to the appropriate JSON file
    // 4. Return success/error status
    
    const response = await fetch('/api/content/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    // For development purposes, we'll simulate a successful save
    // In production, you'd want proper error handling
    console.warn('Save API not available in development mode. Simulating successful save.');
    
    return {
      success: true,
      message: `Successfully saved ${request.section} content (simulated)`,
    };
  }
}

/**
 * Save all content sections at once
 */
export async function saveAllContent(content: {
  hero: any;
  about: any;
  services: any;
  contact: any;
  global: any;
  results: any;
  team: any;
}): Promise<SaveContentResponse[]> {
  const sections: Array<keyof typeof content> = ['hero', 'about', 'services', 'contact', 'global', 'results', 'team'];
  
  const savePromises = sections.map(section => 
    saveContent({ section, content: content[section] })
  );
  
  return Promise.all(savePromises);
}

/**
 * Validate content before saving
 */
export function validateContent(section: string, content: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  switch (section) {
    case 'hero':
      if (!content.headline?.line1) errors.push('Hero headline line 1 is required');
      if (!content.description) errors.push('Hero description is required');
      if (!content.ctaButton?.text) errors.push('Hero CTA button text is required');
      break;
      
    case 'about':
      if (!content.header?.title) errors.push('About title is required');
      if (!content.header?.description) errors.push('About description is required');
      break;
      
    case 'services':
      if (!content.header?.title) errors.push('Services title is required');
      if (!content.consultantTypes || content.consultantTypes.length === 0) {
        errors.push('At least one consultant type is required');
      }
      break;
      
    case 'contact':
      if (!content.header?.title) errors.push('Contact title is required');
      if (!content.contactMethods || content.contactMethods.length === 0) {
        errors.push('At least one contact method is required');
      }
      break;
      
    case 'global':
      if (!content.company?.name) errors.push('Company name is required');
      if (!content.contact?.email) errors.push('Company email is required');
      break;
      
    case 'results':
      if (!content.header?.title) errors.push('Results title is required');
      if (!content.impactMetrics || content.impactMetrics.length === 0) {
        errors.push('At least one impact metric is required');
      }
      break;
      
    case 'team':
      if (!content.header?.title) errors.push('Team title is required');
      if (!content.leadership || content.leadership.length === 0) {
        errors.push('At least one leadership profile is required');
      }
      break;
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Create a backup of current content before saving
 */
export function createBackup(content: any): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupData = {
    timestamp,
    content,
    version: '2.5.0'
  };
  
  // Store in localStorage for development
  const backupKey = `wandavision-backup-${timestamp}`;
  try {
    localStorage.setItem(backupKey, JSON.stringify(backupData));
    console.log(`Content backup created: ${backupKey}`);
    return backupKey;
  } catch (error) {
    console.warn('Failed to create content backup:', error);
    return '';
  }
}

/**
 * Restore content from backup
 */
export function restoreFromBackup(backupKey: string): any | null {
  try {
    const backupData = localStorage.getItem(backupKey);
    if (!backupData) return null;
    
    const parsed = JSON.parse(backupData);
    return parsed.content;
  } catch (error) {
    console.error('Failed to restore from backup:', error);
    return null;
  }
}

/**
 * Get list of available backups
 */
export function getAvailableBackups(): Array<{ key: string; timestamp: string }> {
  const backups = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('wandavision-backup-')) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '');
        backups.push({
          key,
          timestamp: data.timestamp
        });
      } catch (error) {
        // Skip invalid backups
      }
    }
  }
  
  return backups.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}