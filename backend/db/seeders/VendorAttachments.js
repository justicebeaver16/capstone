'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vendorAttachments = [
      // Blue Plate Catering attachments
      {
        name: 'Blue Plate Catering Menu',
        fileUrl: 'https://storage.example.com/vendors/1/menu-bp2025.pdf',
        type: 'menu',
        VendorId: 1,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        name: 'Blue Plate Service Agreement',
        fileUrl: 'https://storage.example.com/vendors/1/contract-bp1278.pdf',
        type: 'contract',
        VendorId: 1,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-22')
      },
      {
        name: 'Blue Plate Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/1/insurance-bp2025.pdf',
        type: 'insurance',
        VendorId: 1,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      
      // George Street Photo & Video attachments
      {
        name: 'George Street Photo Portfolio',
        fileUrl: 'https://storage.example.com/vendors/2/portfolio-gs3456.pdf',
        type: 'portfolio',
        VendorId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03')
      },
      {
        name: 'George Street Photography Contract',
        fileUrl: 'https://storage.example.com/vendors/2/contract-gs1922.pdf',
        type: 'contract',
        VendorId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-04-10')
      },
      {
        name: 'George Street Sample Gallery',
        fileUrl: 'https://storage.example.com/vendors/2/samples-gs2024.jpg',
        type: 'sample-gallery',
        VendorId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03')
      },
      
      // The Langham Chicago attachments
      {
        name: 'The Langham Floor Plans',
        fileUrl: 'https://storage.example.com/vendors/3/floorplan-langham2024.pdf',
        type: 'floor-plan',
        VendorId: 3,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        name: 'The Langham Event Contract',
        fileUrl: 'https://storage.example.com/vendors/3/contract-langham8765.pdf',
        type: 'contract',
        VendorId: 3,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-03-15')
      },
      {
        name: 'The Langham Virtual Tour',
        fileUrl: 'https://storage.example.com/vendors/3/virtual-tour-langham2024.mp4',
        type: 'virtual-tour',
        VendorId: 3,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        name: 'The Langham Policies',
        fileUrl: 'https://storage.example.com/vendors/3/policies-langham2024.pdf',
        type: 'policies',
        VendorId: 3,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      
      // Toast & Jam DJs attachments
      {
        name: 'Toast & Jam Demo Mix',
        fileUrl: 'https://storage.example.com/vendors/4/demo-tj2024.mp3',
        type: 'demo',
        VendorId: 4,
        createdAt: new Date('2024-02-12'),
        updatedAt: new Date('2024-02-12')
      },
      {
        name: 'Toast & Jam Service Agreement',
        fileUrl: 'https://storage.example.com/vendors/4/contract-tj4321.pdf',
        type: 'contract',
        VendorId: 4,
        createdAt: new Date('2024-02-12'),
        updatedAt: new Date('2024-04-05')
      },
      {
        name: 'Toast & Jam Equipment List',
        fileUrl: 'https://storage.example.com/vendors/4/equipment-tj2024.pdf',
        type: 'equipment-list',
        VendorId: 4,
        createdAt: new Date('2024-02-12'),
        updatedAt: new Date('2024-02-12')
      },
      
      // HMR Designs attachments
      {
        name: 'HMR Designs Portfolio',
        fileUrl: 'https://storage.example.com/vendors/5/portfolio-hmr2024.pdf',
        type: 'portfolio',
        VendorId: 5,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        name: 'HMR Designs Contract',
        fileUrl: 'https://storage.example.com/vendors/5/contract-hmr7890.pdf',
        type: 'contract',
        VendorId: 5,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-03-25')
      },
      {
        name: 'HMR Designs Catalog',
        fileUrl: 'https://storage.example.com/vendors/5/catalog-hmr2024.pdf',
        type: 'catalog',
        VendorId: 5,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      
      // Windy City Limousine attachments
      {
        name: 'Windy City Fleet Information',
        fileUrl: 'https://storage.example.com/vendors/6/fleet-wcl2024.pdf',
        type: 'fleet-info',
        VendorId: 6,
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05')
      },
      {
        name: 'Windy City Service Contract',
        fileUrl: 'https://storage.example.com/vendors/6/contract-wcl5432.pdf',
        type: 'contract',
        VendorId: 6,
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-04-02')
      },
      {
        name: 'Windy City Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/6/insurance-wcl2024.pdf',
        type: 'insurance',
        VendorId: 6,
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05')
      },
      {
        name: 'Windy City Driver Licenses',
        fileUrl: 'https://storage.example.com/vendors/6/licenses-wcl2024.pdf',
        type: 'licenses',
        VendorId: 6,
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05')
      },
      
      // Fleur Inc attachments
      {
        name: 'Fleur Inc Portfolio',
        fileUrl: 'https://storage.example.com/vendors/7/portfolio-fleur2024.pdf',
        type: 'portfolio',
        VendorId: 7,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      },
      {
        name: 'Fleur Inc Service Agreement',
        fileUrl: 'https://storage.example.com/vendors/7/contract-fleur9876.pdf',
        type: 'contract',
        VendorId: 7,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-03-30')
      },
      {
        name: 'Fleur Inc Seasonal Availability',
        fileUrl: 'https://storage.example.com/vendors/7/seasonal-fleur2024.pdf',
        type: 'seasonal-availability',
        VendorId: 7,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      },
      
      // West Town Bakery attachments
      {
        name: 'West Town Bakery Cake Catalog',
        fileUrl: 'https://storage.example.com/vendors/8/catalog-wtb2024.pdf',
        type: 'catalog',
        VendorId: 8,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15')
      },
      {
        name: 'West Town Bakery Contract',
        fileUrl: 'https://storage.example.com/vendors/8/contract-wtb2468.pdf',
        type: 'contract',
        VendorId: 8,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-04-08')
      },
      {
        name: 'West Town Bakery Health Certificate',
        fileUrl: 'https://storage.example.com/vendors/8/health-cert-wtb2024.pdf',
        type: 'health-certificate',
        VendorId: 8,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15')
      },
      
      // LK Events attachments
      {
        name: 'LK Events Portfolio',
        fileUrl: 'https://storage.example.com/vendors/9/portfolio-lke2024.pdf',
        type: 'portfolio',
        VendorId: 9,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        name: 'LK Events Service Contract',
        fileUrl: 'https://storage.example.com/vendors/9/contract-lke3579.pdf',
        type: 'contract',
        VendorId: 9,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-03-20')
      },
      {
        name: 'LK Events Services List',
        fileUrl: 'https://storage.example.com/vendors/9/services-lke2024.pdf',
        type: 'services-list',
        VendorId: 9,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        name: 'LK Events Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/9/insurance-lke2024.pdf',
        type: 'insurance',
        VendorId: 9,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      
      // AVFX Chicago attachments
      {
        name: 'AVFX Chicago Equipment List',
        fileUrl: 'https://storage.example.com/vendors/10/equipment-avfx2024.pdf',
        type: 'equipment-list',
        VendorId: 10,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20')
      },
      {
        name: 'AVFX Chicago Service Contract',
        fileUrl: 'https://storage.example.com/vendors/10/contract-avfx1357.pdf',
        type: 'contract',
        VendorId: 10,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-04-15')
      },
      {
        name: 'AVFX Chicago Technical Specifications',
        fileUrl: 'https://storage.example.com/vendors/10/tech-specs-avfx2024.pdf',
        type: 'technical-specs',
        VendorId: 10,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20')
      },
      {
        name: 'AVFX Chicago Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/10/insurance-avfx2024.pdf',
        type: 'insurance',
        VendorId: 10,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20')
      },
      
      // Monterrey Security attachments
      {
        name: 'Monterrey Security Licenses',
        fileUrl: 'https://storage.example.com/vendors/11/licenses-ms2024.pdf',
        type: 'licenses',
        VendorId: 11,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-01-30')
      },
      {
        name: 'Monterrey Security Service Contract',
        fileUrl: 'https://storage.example.com/vendors/11/contract-ms2468.pdf',
        type: 'contract',
        VendorId: 11,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-03-28')
      },
      {
        name: 'Monterrey Security Staff Credentials',
        fileUrl: 'https://storage.example.com/vendors/11/credentials-ms2024.pdf',
        type: 'staff-credentials',
        VendorId: 11,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-01-30')
      },
      {
        name: 'Monterrey Security Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/11/insurance-ms2024.pdf',
        type: 'insurance',
        VendorId: 11,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-01-30')
      },
      
      // ServiceMaster Restoration attachments
      {
        name: 'ServiceMaster Services List',
        fileUrl: 'https://storage.example.com/vendors/12/services-sm2024.pdf',
        type: 'services-list',
        VendorId: 12,
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-02-25')
      },
      {
        name: 'ServiceMaster Service Contract',
        fileUrl: 'https://storage.example.com/vendors/12/contract-sm9753.pdf',
        type: 'contract',
        VendorId: 12,
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-04-18')
      },
      {
        name: 'ServiceMaster Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/12/insurance-sm2024.pdf',
        type: 'insurance',
        VendorId: 12,
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-02-25')
      },
      {
        name: 'ServiceMaster Eco-Certificates',
        fileUrl: 'https://storage.example.com/vendors/12/eco-cert-sm2024.pdf',
        type: 'eco-certificates',
        VendorId: 12,
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-02-25')
      },
      
      // Fig Catering attachments
      {
        name: 'Fig Catering Menu Options',
        fileUrl: 'https://storage.example.com/vendors/13/menu-fig2024.pdf',
        type: 'menu',
        VendorId: 13,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
      },
      {
        name: 'Fig Catering Service Agreement',
        fileUrl: 'https://storage.example.com/vendors/13/contract-fig8642.pdf',
        type: 'contract',
        VendorId: 13,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-03-24')
      },
      {
        name: 'Fig Catering Health Certificate',
        fileUrl: 'https://storage.example.com/vendors/13/health-cert-fig2024.pdf',
        type: 'health-certificate',
        VendorId: 13,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
      },
      {
        name: 'Fig Catering Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/13/insurance-fig2024.pdf',
        type: 'insurance',
        VendorId: 13,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
      },
      
      // Greenhouse Loft Photography attachments
      {
        name: 'Greenhouse Loft Photography Portfolio',
        fileUrl: 'https://storage.example.com/vendors/14/portfolio-gl2024.pdf',
        type: 'portfolio',
        VendorId: 14,
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date('2024-02-08')
      },
      {
        name: 'Greenhouse Loft Photography Contract',
        fileUrl: 'https://storage.example.com/vendors/14/contract-gl7531.pdf',
        type: 'contract',
        VendorId: 14,
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date('2024-04-12')
      },
      {
        name: 'Greenhouse Loft Sample Gallery',
        fileUrl: 'https://storage.example.com/vendors/14/samples-gl2024.jpg',
        type: 'sample-gallery',
        VendorId: 14,
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date('2024-02-08')
      },
      {
        name: 'Greenhouse Loft Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/14/insurance-gl2024.pdf',
        type: 'insurance',
        VendorId: 14,
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date('2024-02-08')
      },
      
      // Chicago History Museum attachments
      {
        name: 'Chicago History Museum Floor Plans',
        fileUrl: 'https://storage.example.com/vendors/15/floorplan-chm2024.pdf',
        type: 'floor-plan',
        VendorId: 15,
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08')
      },
      {
        name: 'Chicago History Museum Event Contract',
        fileUrl: 'https://storage.example.com/vendors/15/contract-chm6420.pdf',
        type: 'contract',
        VendorId: 15,
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-03-18')
      },
      {
        name: 'Chicago History Museum Policies',
        fileUrl: 'https://storage.example.com/vendors/15/policies-chm2024.pdf',
        type: 'policies',
        VendorId: 15,
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08')
      },
      {
        name: 'Chicago History Museum Virtual Tour',
        fileUrl: 'https://storage.example.com/vendors/15/virtual-tour-chm2024.mp4',
        type: 'virtual-tour',
        VendorId: 15,
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08')
      },
      {
        name: 'Chicago History Museum Insurance Certificate',
        fileUrl: 'https://storage.example.com/vendors/15/insurance-chm2024.pdf',
        type: 'insurance',
        VendorId: 15,
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08')
      }
    ];
    
    // Insert vendor attachments
    await queryInterface.bulkInsert('VendorAttachments', vendorAttachments, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the vendor attachments
    await queryInterface.bulkDelete('VendorAttachments', null, {});
  }
};