<h1>Inventory Management System</h1>

<h2>Project Overview</h2>
<p>The Inventory Management System is a web application designed to help businesses manage and track products in their warehouse efficiently. The system provides real-time visibility into stock levels and sales, ensuring users can manage their inventory with ease.</p>

<h2>Features</h2>

<h3>Authentication & Authorization</h3>
<ul>
  <li><strong>Login Page:</strong> Users can log in with their credentials.</li>
  <li><strong>Sign Up:</strong> New users can register an account.</li>
  <li><strong>Role-based Access:</strong> Users can only view and manage their own products.</li>
</ul>

<h3>Product Types Management</h3>
<ul>
  <li>Display a table of product types with ID, name, count, and actions (edit/delete).</li>
  <li>Each product type includes an image.</li>
  <li>Clicking a product type shows all associated items.</li>
  <li>Search functionality by product type name.</li>
  <li>Add a new product type via a popup form, including name, description, and image upload.</li>
</ul>

<h3>Items Management</h3>
<ul>
  <li>Display a table of items for a selected product type with ID, serial number, and actions (edit/delete).</li>
  <li>Mark items as SOLD, updating stock count dynamically.</li>
  <li>Add new items by entering serial numbers manually or in bulk.</li>
  <li>Search functionality by serial number.</li>
  <li>Barcode scanning feature for adding serial numbers via a camera.</li>
</ul>

<h2>Technology Stack</h2>
<ul>
  <li><strong>Frontend:</strong> ReactJS</li>
  <li><strong>Backend:</strong> PHP/Laravel</li>
  <li><strong>Database:</strong> MySQL</li>
  <li><strong>Authentication:</strong> Laravel Breeze</li>
</ul>

<h2>Setup Instructions</h2>

<h3>Step 1: Clone the Repository</h3>
<pre><code>git clone https://github.com/hady43/inventory_cms.git
cd inventory_cms</code></pre>

<h3>Step 2: Install Backend Dependencies</h3>
<pre><code>composer install</code></pre>

<h3>Step 3: Configure Environment Variables</h3>
<ul>
  <li>Copy .env.example to .env:</li>
  <pre><code>cp .env.example .env</code></pre>
  <li>Update .env with your database credentials.</li>
  <li>Generate application key:</li>
  <pre><code>php artisan key:generate</code></pre>
</ul>

<h3>Step 4: Set Up Database</h3>
<pre><code>php artisan migrate</code></pre>

<h3>Step 5: Create Storage Link</h3>
<pre><code>php artisan storage:link</code></pre>

<h3>Step 6: Install Frontend Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>Step 7: Install Barcode Scanner</h3>
<pre><code>npm install html5-qrcode</code></pre>

<h3>Step 8: Run the Application</h3>
<ul>
  <li>Start Backend Server:</li>
  <pre><code>php artisan serve</code></pre>
  <li>Start Frontend Development Server:</li>
  <pre><code>npm run dev</code></pre>
</ul>

<h2>Additional Configuration</h2>

<h3>Camera Permissions</h3>
<p>Ensure your browser has access to the camera for barcode scanning:</p>
<ul>
  <li>Open Chrome settings: <code>chrome://settings/content/camera</code></li>
  <li>Allow camera access for the application.</li>
</ul>
