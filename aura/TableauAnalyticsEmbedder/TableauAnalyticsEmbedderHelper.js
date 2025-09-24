({
    initializeComponent: function(component) {
        console.log('Initializing Tableau Analytics Embedder component');
        
        // Set initial loading state
        component.set("v.isLoading", true);
        component.set("v.hasError", false);
        
        // Validate required attributes
        var dashboardId = component.get("v.dashboardId");
        if (!dashboardId || dashboardId.trim() === '') {
            console.warn('No dashboard ID specified - dashboard may not load properly');
            // Don't error out, let the analytics component handle it
        }
        
        // Set up context information
        this.setupDashboardContext(component);
        
        // The analytics dashboard component will handle its own loading
        // We'll wait for the onready or onerror events
        setTimeout(function() {
            // If still loading after 30 seconds, show a timeout message
            if (component.get("v.isLoading")) {
                this.handleError(component, 'Dashboard loading is taking longer than expected. Please check your network connection and dashboard configuration.');
            }
        }.bind(this), 30000);
    },
    
    setupDashboardContext: function(component) {
        var variant = component.get("v.variant");
        var recordId = component.get("v.recordId");
        
        // Set up filters based on context
        var contextFilter = {};
        
        if (recordId) {
            contextFilter.recordId = recordId;
        }
        
        if (variant === 'supervisor') {
            contextFilter.supervisorMode = true;
        }
        
        // Apply context filter if we have any
        if (Object.keys(contextFilter).length > 0) {
            var existingFilter = component.get("v.filter");
            var combinedFilter = {};
            
            // Merge existing filter with context filter
            if (existingFilter) {
                try {
                    var parsed = JSON.parse(existingFilter);
                    combinedFilter = Object.assign(parsed, contextFilter);
                } catch (e) {
                    console.warn('Error parsing existing filter:', e);
                    combinedFilter = contextFilter;
                }
            } else {
                combinedFilter = contextFilter;
            }
            
            component.set("v.filter", JSON.stringify(combinedFilter));
            console.log('Applied context filter:', combinedFilter);
        }
    },
    
    handleError: function(component, message) {
        console.error('Analytics dashboard error:', message);
        component.set("v.hasError", true);
        component.set("v.errorMessage", message);
        component.set("v.isLoading", false);
        this.showToast(component, 'Error', message, 'error');
    },
    
    showToast: function(component, title, message, variant) {
        try {
            var toastEvent = $A.get("e.force:showToast");
            if (toastEvent) {
                toastEvent.setParams({
                    title: title,
                    message: message,
                    type: variant,
                    duration: variant === 'error' ? 5000 : 3000
                });
                toastEvent.fire();
            } else {
                // Fallback for environments without toast
                console.log('Toast: ' + title + ' - ' + message);
                if (variant === 'error') {
                    alert('Error: ' + message);
                }
            }
        } catch (error) {
            console.error('Toast error:', error);
        }
    },
    
    getDashboardInfo: function(component) {
        return {
            dashboardId: component.get("v.dashboardId"),
            dashboardName: component.get("v.dashboardName"),
            variant: component.get("v.variant"),
            recordId: component.get("v.recordId"),
            filter: component.get("v.filter"),
            showSharing: component.get("v.showSharing"),
            showTitle: component.get("v.showTitle"),
            hideOnError: component.get("v.hideOnError")
        };
    }
})
