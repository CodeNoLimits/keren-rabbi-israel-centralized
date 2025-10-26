#!/usr/bin/env python3
"""
Script to fix TypeScript errors in realProducts.ts by:
1. Removing duplicate keys in JavaScript objects
2. Ensuring all products have required properties: nameFrench, nameSpanish, nameRussian
3. Preserving existing non-null values
"""

import re
import sys

def fix_product_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split content into individual product objects
    # Find all product definitions between { and },
    products = []
    current_product = ""
    brace_count = 0
    in_product = False
    
    lines = content.split('\n')
    result_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if this line contains a product id definition
        if re.match(r'\s*\'[^\']+\':\s*\{', line):
            # This is a product start
            in_product = True
            current_product_lines = [line]
            brace_count = 1
            i += 1
            
            # Collect all lines for this product
            while i < len(lines) and brace_count > 0:
                line = lines[i]
                current_product_lines.append(line)
                
                # Count braces to know when product ends
                brace_count += line.count('{') - line.count('}')
                i += 1
            
            # Now fix this product
            fixed_product = fix_single_product(current_product_lines)
            result_lines.extend(fixed_product)
            
        else:
            # This line is not part of a product definition
            result_lines.append(line)
            i += 1
    
    # Write the fixed content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(result_lines))

def fix_single_product(product_lines):
    """Fix a single product by removing duplicates and ensuring required properties exist"""
    
    # Extract existing values for name properties
    name_english = None
    name_french = None
    name_spanish = None
    name_russian = None
    
    # Remove duplicate lines and collect values
    cleaned_lines = []
    seen_properties = set()
    
    for line in product_lines:
        # Check for name properties
        if 'nameEnglish:' in line:
            if 'nameEnglish' not in seen_properties:
                name_english = extract_value(line)
                cleaned_lines.append(line)
                seen_properties.add('nameEnglish')
        elif 'nameFrench:' in line:
            if 'nameFrench' not in seen_properties:
                value = extract_value(line)
                if value != 'null':
                    name_french = value
                seen_properties.add('nameFrench')
        elif 'nameSpanish:' in line:
            if 'nameSpanish' not in seen_properties:
                value = extract_value(line)
                if value != 'null':
                    name_spanish = value
                seen_properties.add('nameSpanish')
        elif 'nameRussian:' in line:
            if 'nameRussian' not in seen_properties:
                value = extract_value(line)
                if value != 'null':
                    name_russian = value
                seen_properties.add('nameRussian')
        else:
            cleaned_lines.append(line)
    
    # Now insert the required properties after nameEnglish
    final_lines = []
    for i, line in enumerate(cleaned_lines):
        final_lines.append(line)
        
        # If this is the nameEnglish line, add the other name properties after it
        if 'nameEnglish:' in line:
            indent = '    '  # Use same indentation
            
            if name_french:
                final_lines.append(f"{indent}nameFrench: {name_french},")
            else:
                final_lines.append(f"{indent}nameFrench: null,")
                
            if name_spanish:
                final_lines.append(f"{indent}nameSpanish: {name_spanish},")
            else:
                final_lines.append(f"{indent}nameSpanish: null,")
                
            if name_russian:
                final_lines.append(f"{indent}nameRussian: {name_russian},")
            else:
                final_lines.append(f"{indent}nameRussian: null,")
    
    return final_lines

def extract_value(line):
    """Extract the value from a property line"""
    # Look for the value after the colon
    match = re.search(r':\s*(.+),?\s*$', line)
    if match:
        return match.group(1).strip().rstrip(',')
    return 'null'

if __name__ == '__main__':
    fix_product_file('client/src/data/realProducts.ts')
    print("Fixed realProducts.ts - removed duplicates and ensured all products have required properties")